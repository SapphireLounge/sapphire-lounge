import { z } from 'zod';

const validEvents = ['Flavour Tasting Night', 'DJ Night', 'Student Night'] as const;

export const eventRegistrationSchema = z.object({
  eventChoice: z.enum(validEvents, {
    errorMap: () => ({ message: 'Please select an event' })
  }),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  guests: z.number().min(1).max(10),
  notes: z.string().optional(),
});

export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;
