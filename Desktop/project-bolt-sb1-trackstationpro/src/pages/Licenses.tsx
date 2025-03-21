import { useState } from 'react';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LicenseCard } from '../components/licenses/LicenseCard';
import { LicenseForm } from '../components/licenses/LicenseForm';
import { useLicenses } from '../hooks/useLicenses';
import { License } from '../types';
import { TEXT } from '../constants/text';

export default function Licenses() {
  const { licenses, addLicense, updateLicense, deleteLicense } = useLicenses();
  
  const [showForm, setShowForm] = useState(false);
  const [editLicense, setEditLicense] = useState<License | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleAddLicense = (license: Omit<License, 'id'>) => {
    addLicense(license);
    setShowForm(false);
  };
  
  const handleUpdateLicense = (license: Omit<License, 'id'>) => {
    if (editLicense) {
      updateLicense(editLicense.id, license);
      setEditLicense(null);
    }
  };
  
  const handleEditClick = (license: License) => {
    setEditLicense(license);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm(TEXT.confirmDeleteLicense)) {
      deleteLicense(id);
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditLicense(null);
  };
  
  const filteredLicenses = licenses.filter(license => 
    license.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 animate-fade-in custom-container md:flex md:flex-col md:h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold gradient-text custom-heading text-center sm:text-left w-full sm:w-auto">{TEXT.licenses}</h1>
        
        <Button 
          onClick={() => setShowForm(true)}
          icon={<Plus className="w-6 h-6" />}
          className="w-full sm:w-auto"
        >
          {TEXT.addLicense}
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder={TEXT.searchLicenses}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            fullWidth
          />
        </div>
        
        <Button
          variant="outline"
          icon={<SlidersHorizontal className="w-5 h-5" />}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full sm:w-auto"
        >
          {TEXT.filters}
        </Button>
      </div>
      
      {showFilters && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 animate-fade-in mb-6">
          <p className="text-gray-400">{TEXT.filtersComingSoon}</p>
        </div>
      )}
      
      {(showForm || editLicense) && (
        <div className="mb-6 animate-slide-up">
          <LicenseForm
            onSubmit={editLicense ? handleUpdateLicense : handleAddLicense}
            onCancel={handleCancelForm}
            initialData={editLicense || undefined}
            isEdit={!!editLicense}
          />
        </div>
      )}
      
      <div className="md:flex-1 md:min-h-0 md:overflow-auto">
        {filteredLicenses.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-400">{TEXT.noLicensesFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredLicenses.map(license => (
              <div key={license.id} className="animate-fade-in">
                <LicenseCard
                  license={license}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
