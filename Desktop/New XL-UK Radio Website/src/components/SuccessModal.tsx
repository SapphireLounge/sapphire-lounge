import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <div 
        className="bg-dark-lighter border border-primary/20 rounded-xl shadow-xl shadow-primary/10 p-6 max-w-md w-full relative z-10 animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute top-3 right-3">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          
          <h2 id="modal-title" className="text-xl font-display font-bold mb-2">Success!</h2>
          
          <p className="text-gray-300 mb-6">{message}</p>
          
          <div className="w-full max-w-[200px] h-[3px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 mb-6"></div>
          
          <button 
            onClick={onClose} 
            className="btn btn-primary px-8"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
