import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

function Contact() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Send Message');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
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
    
    // Check if all required fields are filled
    if (formData.name && formData.email && formData.message) {
      setIsProcessing(true);
      setButtonText('Processing...');
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setButtonText('Message Sent!');
      setIsProcessing(false);
      // You can add your form submission logic here
    }
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
            className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-accent-700/20"
          >
            <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Send us a message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary-400 to-accent-500 py-3 rounded-lg font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {buttonText}
                  </span>
                ) : (
                  buttonText
                )}
              </button>
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
    </div>
  );
}

export default Contact;
