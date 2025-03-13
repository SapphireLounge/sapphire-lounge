import { Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  index?: number;
}

const EventCard = ({ title, date, time, location, image, index = 0 }: EventCardProps) => {
  return (
    <motion.div 
      className="card group bg-dark-lighter rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col hover:shadow-primary/30 h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
      </div>
      <div className="p-4 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <div className="space-y-2 text-gray-400 text-base">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary w-full text-base py-2.5">Get Tickets</button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;