import { useState, useCallback } from 'react';
import { z } from 'zod';

interface ValidationOptions<T> {
  schema: z.ZodType<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: z.ZodError) => void;
}

export function useFormValidation<T>({ schema, onSuccess, onError }: ValidationOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((name: string, value: unknown) => {
    try {
      const fieldSchema = schema.shape[name as keyof T];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message || 'Invalid input';
        setErrors(prev => ({ ...prev, [name]: message }));
      }
      return false;
    }
  }, [schema]);

  const validateForm = useCallback(async (data: unknown) => {
    setIsValidating(true);
    try {
      const validData = await schema.parseAsync(data);
      setErrors({});
      onSuccess?.(validData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        onError?.(error);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [schema, onSuccess, onError]);

  return {
    errors,
    isValidating,
    validateField,
    validateForm,
    hasErrors: Object.keys(errors).length > 0
  };
}
