import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, Users, Phone, Mail, MessageSquare, Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { EventData } from '../types/events';

interface EventSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: EventData;
}

const capitalize = (str: string | null | undefined) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'dj') return 'DJ';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

const EventSuccess: React.FC<EventSuccessProps> = ({ isOpen, onClose, eventData }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    if (!eventData) return;

    // Create a temporary container
    const printContent = document.createElement('div');
    printContent.className = 'fixed left-[-9999px] bg-neutral-900 p-6 rounded-lg shadow-xl';
    printContent.style.width = '360px';
    
    // Add header with logo and confirmation
    printContent.innerHTML = `
      <div class="flex flex-col items-center mb-4">
        <div class="w-14 h-14 text-green-500 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 class="text-lg font-semibold text-white mb-1">Event Booking Confirmed!</h2>
        <p class="text-xs text-neutral-400 text-center">
          Thank you for choosing Sapphire Lounge
        </p>
      </div>

      ${eventData.qrCode ? `
        <div class="flex flex-col items-center mb-4">
          <div class="flex justify-center w-full">
            <img src="${eventData.qrCode}" alt="QR Code" class="w-28 h-28 bg-white p-1.5 rounded-lg mb-2.5" style="margin-left: auto; margin-right: auto;" />
          </div>
          <p class="text-xs text-neutral-400">Show this QR code upon arrival</p>
        </div>
      ` : ''}

      <div class="space-y-1.5">
        ${[
          { icon: 'calendar', label: 'Event', value: capitalize(eventData.eventTitle) },
          { icon: 'calendar', label: 'Date', value: formatDate(eventData.date) },
          { icon: 'clock', label: 'Time', value: eventData.time },
          { icon: 'user', label: 'Name', value: capitalize(eventData.name) },
          { icon: 'mail', label: 'Email', value: eventData.email },
          { icon: 'phone', label: 'Phone', value: eventData.phone },
          { icon: 'users', label: 'Guests', value: eventData.guests.toString() },
          ...(eventData.specialRequests ? [{ icon: 'message-square', label: 'Special Requests', value: capitalize(eventData.specialRequests) }] : [])
        ].map(({ icon, label, value }) => `
          <div class="bg-neutral-800/50 rounded-lg px-3 py-2">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                <svg class="w-4 h-4 text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${icon === 'calendar' ? '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>' : ''}
                  ${icon === 'clock' ? '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>' : ''}
                  ${icon === 'user' ? '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' : ''}
                  ${icon === 'mail' ? '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>' : ''}
                  ${icon === 'phone' ? '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>' : ''}
                  ${icon === 'users' ? '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' : ''}
                  ${icon === 'message-square' ? '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' : ''}
                </svg>
              </div>
              <div class="flex-1 min-w-0 ml-2">
                <div class="flex items-center">
                  <span class="text-xs text-white">${label}:</span>
                  <span class="text-xs text-primary-400 ml-1 break-all">${value}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Add to document temporarily
    document.body.appendChild(printContent);

    try {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Convert to image
      const canvas = await html2canvas(printContent, {
        backgroundColor: '#171717',
        scale: 4,
        useCORS: true,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const element = clonedDoc.body.firstElementChild as HTMLElement;
          if (element) {
            element.style.transform = 'none';
            element.style.position = 'relative';
            element.style.left = '0';
          }
        }
      });

      // Convert and download
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `sapphire-lounge-event-${eventData.eventId}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Error generating confirmation image:', error);
    } finally {
      // Clean up
      document.body.removeChild(printContent);
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
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900 p-3 md:p-8 rounded-xl md:rounded-lg shadow-xl w-full max-w-[90%] md:max-w-4xl mx-2 md:mx-auto relative"
            ref={modalRef}
          >
            <button
              onClick={onClose}
              className="absolute right-2 md:right-4 top-2 md:top-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-2">
                <div className="flex flex-col items-center mb-3 md:mb-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      delay: 0.2,
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500 mb-2 md:mb-4" />
                  </motion.div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-1 md:mb-2">Event Booking Confirmed!</h2>
                  <p className="text-sm md:text-base text-neutral-400 text-center">
                    Thank you for choosing Sapphire Lounge. Your event details are below.
                  </p>

                  {eventData?.qrCode && (
                    <div className="text-center mt-3 md:mt-6">
                      <img 
                        src={eventData.qrCode} 
                        alt="Event QR Code" 
                        className="mx-auto w-32 h-32 md:w-40 md:h-40 bg-white p-1 md:p-2 rounded-lg mb-3 md:mb-4"
                      />
                      <p className="text-xs md:text-sm text-neutral-400">Show this QR code upon arrival</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Event:</span>{' '}
                        <span className="text-primary-400">{capitalize(eventData.eventTitle)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Date:</span>{' '}
                        <span className="text-primary-400">{formatDate(eventData.date)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Time:</span>{' '}
                        <span className="text-primary-400">{eventData.time}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Name:</span>{' '}
                        <span className="text-primary-400">{capitalize(eventData.name)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Email:</span>{' '}
                        <span className="text-primary-400">{eventData.email}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Phone:</span>{' '}
                        <span className="text-primary-400">{eventData.phone}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                    <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-xs md:text-base break-words">
                        <span className="text-white">Guests:</span>{' '}
                        <span className="text-primary-400">{eventData.guests}</span>
                      </span>
                    </div>
                  </div>

                  {eventData.specialRequests && (
                    <div className="flex items-center text-neutral-300 bg-neutral-800/50 p-1 md:p-2 rounded-lg text-sm md:text-base">
                      <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-400 mr-1.5 md:mr-2 flex-shrink-0" />
                      <div className="flex items-center min-w-0 flex-1">
                        <span className="text-xs md:text-base break-words">
                          <span className="text-white">Special Requests:</span>{' '}
                          <span className="text-primary-400">{capitalize(eventData.specialRequests)}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <button
                    onClick={downloadConfirmation}
                    className="w-full py-2 md:py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center justify-center gap-1.5 md:gap-2 hover:opacity-90 transition-opacity text-sm md:text-base"
                  >
                    <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Save Confirmation
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 md:py-3 px-4 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventSuccess;
