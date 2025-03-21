import { useState, useEffect } from 'react';
import { License } from '../types';
import { storage } from '../utils/storage';
import { getNextDueDate } from '../utils/date';
import toast from 'react-hot-toast';

export function useLicenses() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicenses = () => {
      try {
        const data = storage.getLicenses();
        setLicenses(data);
      } catch (error) {
        console.error('Error fetching licenses:', error);
        toast.error('Failed to load licenses');
      } finally {
        setLoading(false);
      }
    };

    fetchLicenses();
  }, []);

  const addLicense = (license: Omit<License, 'id'>) => {
    try {
      const newLicense = { 
        ...license, 
        id: crypto.randomUUID() 
      };
      const updatedLicenses = [...licenses, newLicense];
      storage.setLicenses(updatedLicenses);
      setLicenses(updatedLicenses);
      toast.success('License added successfully');
      return newLicense;
    } catch (error) {
      console.error('Error adding license:', error);
      toast.error('Failed to add license');
      return null;
    }
  };

  const updateLicense = (id: string, updates: Partial<License>) => {
    try {
      const updatedLicenses = licenses.map(license =>
        license.id === id ? { ...license, ...updates } : license
      );
      storage.setLicenses(updatedLicenses);
      setLicenses(updatedLicenses);
      toast.success('License updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating license:', error);
      toast.error('Failed to update license');
      return false;
    }
  };

  const deleteLicense = (id: string) => {
    try {
      const updatedLicenses = licenses.filter(license => license.id !== id);
      storage.setLicenses(updatedLicenses);
      setLicenses(updatedLicenses);
      toast.success('License deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting license:', error);
      toast.error('Failed to delete license');
      return false;
    }
  };

  const renewLicense = (id: string) => {
    try {
      const license = licenses.find(l => l.id === id);
      if (!license) return false;

      // Handle custom frequency by just using the existing next due date
      let nextDueDate: Date;
      if (license.renewalFrequency === 'custom') {
        nextDueDate = new Date(license.nextDueDate);
      } else {
        nextDueDate = getNextDueDate(license.nextDueDate, license.renewalFrequency);
      }
      
      const updatedLicenses = licenses.map(l =>
        l.id === id ? { ...l, nextDueDate: nextDueDate.toISOString() } : l
      );
      
      storage.setLicenses(updatedLicenses);
      setLicenses(updatedLicenses);
      toast.success('License renewed successfully');
      return true;
    } catch (error) {
      console.error('Error renewing license:', error);
      toast.error('Failed to renew license');
      return false;
    }
  };

  return { 
    licenses, 
    loading, 
    addLicense, 
    updateLicense, 
    deleteLicense,
    renewLicense
  };
}
