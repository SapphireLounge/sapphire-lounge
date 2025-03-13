import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShowCardProps {
  id: string;
  title: string;
  dj: string;
  time: string;
  days?: string;
  image: string;
  index?: number;
}

const ShowCard = ({ id, title, dj, time, days = "Various days", image, index = 0 }: ShowCardProps) => {
  return (
    <motion.div 
      className="card group bg-dark-lighter rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/shows/${id}`} className="block h-full">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {dj}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2">{title}</h3>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center mb-2 sm:mb-0">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
              <span>{days}</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <span className="text-primary font-medium text-sm sm:text-base">Listen Now</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShowCard;