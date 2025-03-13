import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

interface DJCardProps {
  id: string;
  name: string;
  image: string;
  show: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  index?: number;
}

const DJCard = ({ id, name, image, show, instagram, twitter, facebook, index = 0 }: DJCardProps) => {
  return (
    <motion.div 
      className="card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <Link to={`/djs/${id}`} className="block">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
        </Link>
      </div>
      
      <div className="p-4">
        <Link to={`/djs/${id}`} className="block">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-primary mb-4">{show}</p>
        </Link>
        
        <div className="flex space-x-3">
          {facebook && (
            <a 
              href={facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label={`${name}'s Facebook`}
            >
              <Facebook className="h-5 w-5" />
            </a>
          )}
          {instagram && (
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label={`${name}'s Instagram`}
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {twitter && (
            <a 
              href={twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label={`${name}'s X (Twitter)`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DJCard;