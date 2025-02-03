import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Loader2, MessageSquare } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useDeviceType } from '../hooks/useDeviceType';

// Fix Leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon: L.Icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// FINAL COORDINATES - Sapphire Lounge location on Wind Street (between ASK Italian & Dorothy's)
// DO NOT MODIFY these coordinates as they mark the exact location of Sapphire Lounge
const position: [number, number] = [51.61958, -3.94048];

const ContactSuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#050D1A] rounded-xl p-6 max-w-md w-full relative z-[9999] border border-dark-700 shadow-2xl"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                className="mx-auto mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 mx-auto flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Message Sent!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-200"
              >
                Thank you for reaching out to Sapphire Lounge!
              </motion.p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-center"
              >
                <p>What happens next:</p>
                <ul className="mt-2 space-y-2">
                  <li>• Our team will review your message</li>
                  <li>• We aim to respond within 24 hours</li>
                  <li>• You'll receive a reply at your email address</li>
                  <li>• For urgent matters, please call us directly</li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6"
            >
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function Contact() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Send Message');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setButtonText('Sending...');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setButtonText('Send Message');
    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Get in touch with us for any inquiries or feedback.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 transition-colors hover:bg-black/50 ${
              isMobile ? 'p-4 w-[99vw] -mx-4' : 'p-6'
            }`}
          >
            <form onSubmit={handleSubmit} className={isMobile ? 'w-[98%] mx-auto' : ''}>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className={`w-[102%] -ml-[1%] bg-neutral-900 rounded-lg px-4 ${
                      isMobile ? 'py-2.5' : 'py-2'
                    } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className={`w-[102%] -ml-[1%] bg-neutral-900 rounded-lg px-4 ${
                      isMobile ? 'py-2.5' : 'py-2'
                    } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-sm text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className={`w-[102%] -ml-[1%] bg-neutral-900 rounded-lg px-4 ${
                      isMobile ? 'py-2.5' : 'py-2'
                    } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500`}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    required
                    rows={3}
                    className={`w-[102%] -ml-[1%] bg-neutral-900 rounded-lg px-4 ${
                      isMobile ? 'py-2.5' : 'py-2'
                    } text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none`}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-[102%] -ml-[1%] bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg transition-all duration-200 text-sm md:text-base ${
                      isMobile ? 'py-3' : 'py-3 md:py-4'
                    } hover:from-primary-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {buttonText}
                      </div>
                    ) : (
                      buttonText
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-accent-700/20 mb-8">
              <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary-300 w-5 h-5" />
                  <span>01792 555888</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary-300 w-5 h-5" />
                  <span>info@sapphirelounge.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary-300 w-5 h-5" />
                  <span>Wind Street, Swansea, Wales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-primary-300 w-5 h-5" />
                  <span>TUE - SUN: 5:00 PM - 2:00 AM</span>
                </div>
              </div>
            </div>

            {/* Map */}
            {isMounted && (
              <motion.div className="h-[300px] rounded-lg overflow-hidden border border-accent-700/20">
                <MapContainer
                  center={position}
                  zoom={19}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      Sapphire Lounge<br />
                      Wind Street, Swansea, Wales
                    </Popup>
                  </Marker>
                </MapContainer>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <ContactSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
    </div>
  );
}

export default Contact;
