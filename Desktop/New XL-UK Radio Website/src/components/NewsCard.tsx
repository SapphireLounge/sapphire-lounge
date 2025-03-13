import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewsCardProps {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  index?: number;
}

const NewsCard = ({ title, date, image, excerpt, category, index = 0 }: NewsCardProps) => {
  return (
    <motion.div 
      className="card group bg-dark-lighter rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col hover:shadow-primary/30 h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70"></div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{date}</span>
            </div>
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-base">{excerpt}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;