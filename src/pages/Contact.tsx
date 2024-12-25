import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { handleContactSubmission } from '@/lib/handlers';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/FormInput';
import { Toaster } from 'react-hot-toast';

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

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

function Contact() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsProcessing(true);
    try {
      const result = await handleContactSubmission(data);
      if (result.success) {
        reset();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
              Contact Us
            </h1>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Name
                  </label>
                  <FormInput
                    placeholder="Your name"
                    {...register('name')}
                    error={errors.name?.message}
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500 text-white placeholder-gray-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Email
                  </label>
                  <FormInput
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-accent-500 text-white placeholder-gray-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent hover:border-neutral-600 transition-colors text-white placeholder-gray-500"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium 
                           hover:from-primary-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 
                           focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed
                           transition duration-200 transform hover:scale-[1.02]"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Map */}
              {isMounted && (
                <div className="h-[300px] rounded-xl overflow-hidden border border-white/10">
                  <MapContainer
                    center={position}
                    zoom={17}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                      <Popup>
                        Sapphire Lounge
                        <br />
                        Wind Street, Swansea
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}

              {/* Contact Details */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-primary-300 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Address</h3>
                    <p className="text-gray-400 text-sm">Wind Street, Swansea, SA1 1DY</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-primary-300 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-gray-400 text-sm">01792 555 888</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-primary-300 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-gray-400 text-sm">info@sapphirelounge.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-5 h-5 text-primary-300 mt-1" />
                  <div>
                    <h3 className="font-medium text-white">Opening Hours</h3>
                    <p className="text-gray-400 text-sm">Tuesday - Sunday: 5:00 PM - 2:00 AM</p>
                    <p className="text-gray-400 text-sm">Monday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
