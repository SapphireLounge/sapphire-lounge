import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Users, Phone, Mail, MessageSquare, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ReservationData } from '../types/reservations';

interface ReservationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  reservationData: ReservationData;
}

const ReservationSuccess: React.FC<ReservationSuccessProps> = ({ isOpen, onClose, reservationData }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle modal close
  const handleClose = () => {
    onClose();
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Not specified';
    
    const date = new Date(dateStr);
    const day = date.getDate();
    const ordinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).replace(/\d+/, () => ordinal(day));
  };

  const downloadConfirmation = async () => {
    if (modalRef.current) {
      try {
        // Create a clone of the modal content
        const modalClone = modalRef.current.cloneNode(true) as HTMLElement;
        
        // Remove the close button from clone
        const closeButton = modalClone.querySelector('button');
        if (closeButton) {
          closeButton.remove();
        }
        
        // Style the clone for capture
        modalClone.style.position = 'absolute';
        modalClone.style.left = '-9999px';
        modalClone.style.transform = 'none';
        modalClone.style.width = '375px'; // Fixed width for consistency
        modalClone.style.backgroundColor = '#171717';
        modalClone.style.padding = '24px';
        modalClone.style.borderRadius = '12px';
        
        // Add clone to body temporarily
        document.body.appendChild(modalClone);
        
        // Capture with improved settings
        const canvas = await html2canvas(modalClone, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          backgroundColor: '#171717',
          logging: false,
          windowWidth: 375,
          windowHeight: modalClone.offsetHeight,
          onclone: (clonedDoc) => {
            const element = clonedDoc.body.firstElementChild as HTMLElement;
            if (element) {
              element.style.transform = 'none';
              element.style.margin = '0';
            }
          }
        });

        // Remove the clone
        document.body.removeChild(modalClone);

        // Convert and download
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'sapphire-lounge-reservation.png';
        link.href = image;
        link.click();
      } catch (error) {
        console.error('Error generating confirmation image:', error);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-neutral-900 rounded-xl max-w-md w-full relative"
            ref={modalRef}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4">
              <div className="text-center mb-3">
                <div className="inline-block p-2 bg-emerald-500/20 rounded-full mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Reservation Successful!</h2>
                  {reservationData.name && <p className="text-sm text-neutral-400">Thank you, {reservationData.name}, for your reservation!</p>}
                  <p className="text-sm text-neutral-400">Your reservation details are as follows:</p>
                </div>
              </div>

              {reservationData.qrCode && (
                <div className="text-center mb-4">
                  <img 
                    src={reservationData.qrCode} 
                    alt="Reservation QR Code" 
                    className="mx-auto w-28 h-28 bg-white p-2 rounded-lg"
                  />
                  <p className="text-xs text-neutral-400 mt-1">Show this QR code upon arrival</p>
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm break-words">{formatDate(reservationData.date?.toString() || '')}</span>
                  </div>
                </div>

                <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm break-words">{reservationData.time}</span>
                  </div>
                </div>

                <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                  <Users className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm break-words">{reservationData.guests} Guests</span>
                  </div>
                </div>

                <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm break-words">{reservationData.phone}</span>
                  </div>
                </div>

                <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm break-words">{reservationData.email}</span>
                  </div>
                </div>

                {reservationData.notes && (
                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-2 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-sm break-words">{reservationData.notes}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <button
                  onClick={downloadConfirmation}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Save Confirmation
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationSuccess;
