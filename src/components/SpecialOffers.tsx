import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SpecialOffersProps {
  titleClassName?: string;
  buttonClassName?: string;
}

const specialOffers = [
  {
    id: 1,
    title: "Happy Hour Special",
    description: "Enjoy 20% off on all premium shisha flavours",
    days: "Tuesday - Thursday",
    time: "5 PM - 7 PM",
    image: "/images/events/Happy Hour.jpg"
  },
  {
    id: 2,
    title: "Group Discount",
    description: "10% off for groups of 4 or more",
    days: "All Week",
    time: "Any Time",
    image: "/images/events/Group Package.jpg"
  },
  {
    id: 3,
    title: "Student Night",
    description: "Show your student ID for exclusive deals",
    days: "Wednesdays",
    time: "6 PM - Close",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  }
];

function SpecialOffers({ titleClassName, buttonClassName }: SpecialOffersProps) {
  return (
    <section className="pt-4 md:pt-8 bg-[#020B18]">
      <div className="container mx-auto px-4">
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-[0.0625rem] bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 pb-0.5 ${titleClassName}`}>
          Special Offers
        </h2>
        <p className="text-gray-400 text-center mt-1.5 mb-2 md:mb-6 max-w-3xl mx-auto text-base">
          Take advantage of our exclusive deals and make your experience even more special.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialOffers.map((offer) => (
            <motion.article
              key={offer.id}
              whileHover={{ y: -5 }}
              className="bg-dark-950/80 backdrop-blur-sm rounded-lg overflow-hidden border border-accent-700/20 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={offer.image}
                  alt={`${offer.title} at Sapphire Lounge`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 pb-2">
                  <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                  <p className="text-gray-200 text-sm">{offer.description}</p>
                </div>
              </div>
              <div className="p-3 pt-2">
                <div className="flex items-center text-primary-300 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{offer.days}, {offer.time}</span>
                </div>
                <Link
                  to="/reservations"
                  className={`block w-full bg-gradient-to-r from-primary-400 to-accent-500 py-2 rounded-md font-semibold hover:from-primary-500 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition-all text-white shadow-lg text-sm text-center ${buttonClassName}`}
                >
                  Book Now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;