import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // News data from the provided images, ordered chronologically (newest first)
  const allNews = [
    {
      id: 'business-growth-wales-awards',
      title: 'XL:UK Radio Nominated for Business Growth Wales Awards',
      date: 'March 1, 2025',
      image: '/images/business-awards.jpg',
      excerpt: 'XL:UK Radio has been nominated for the prestigious Business Growth Wales Awards, recognizing our exceptional growth and contribution to the local economy.',
      category: 'Awards'
    },
    {
      id: 'google-assistant',
      title: 'XL:UK Radio Now Available on Google Assistant',
      date: 'February 25, 2025',
      image: '/images/google-assistant.jpg',
      excerpt: 'You can now listen to XL:UK Radio on your Google Assistant-enabled devices. Just say "Hey Google, play XL:UK Radio" to start streaming.',
      category: 'Technology'
    },
    {
      id: 'tunein-radio',
      title: 'XL:UK Radio Now on TuneIn',
      date: 'February 20, 2025',
      image: '/images/tunein.jpg',
      excerpt: 'You can now listen to XL:UK Radio on TuneIn! Access our station on any device that supports the TuneIn platform.',
      category: 'Technology'
    },
    {
      id: 'radioplayer-partnership',
      title: 'XL:UK Radio Joins Radioplayer',
      date: 'February 15, 2025',
      image: '/images/radioplayer.jpg',
      excerpt: 'We\'re excited to announce our partnership with Radioplayer, making it easier than ever to listen to XL:UK Radio across all your devices.',
      category: 'Partnership'
    },
    {
      id: 'hnw-magazine-partnership',
      title: 'XL:UK Radio Partners with HNW Magazine',
      date: 'February 10, 2025',
      image: '/images/hnw-magazine.jpg',
      excerpt: 'XL:UK Radio has formed an exclusive partnership with HNW Magazine to bring you the latest in lifestyle and entertainment news.',
      category: 'Partnership'
    },
    {
      id: 'nation-player-app',
      title: 'XL:UK Radio Available on the Nation Player App',
      date: 'February 5, 2025',
      image: '/images/nation-player.jpg',
      excerpt: 'Listen to XL:UK Radio on the Nation Player app, available for both iOS and Android devices. Download now to access our station on the go.',
      category: 'Technology'
    },
    {
      id: 'pink-monster-partnership',
      title: 'XL:UK Radio Teams Up with Pink Monster',
      date: 'January 30, 2025',
      image: '/images/pink-monster.jpg',
      excerpt: 'We\'re thrilled to announce our new partnership with Pink Monster, bringing exclusive content and special promotions.',
      category: 'Partnership'
    },
    {
      id: 'ultra-radiothon',
      title: 'XL:UK Radio Supports Ultra Radiothon',
      date: 'January 25, 2025',
      image: '/images/ultra-radiothon.jpg',
      excerpt: 'XL:UK Radio is proud to support the Ultra Radiothon, raising funds for important charitable causes in our community.',
      category: 'Community'
    },
    {
      id: 'awards-recognition',
      title: 'XL:UK Radio Receives Industry Recognition',
      date: 'January 20, 2025',
      image: '/images/awards.jpg',
      excerpt: 'XL:UK Radio has been recognized for its outstanding contribution to the radio industry with multiple award nominations.',
      category: 'Awards'
    },
    {
      id: 'alexa-skills',
      title: 'XL:UK Radio Now Available on Alexa',
      date: 'January 15, 2025',
      image: '/images/alexa.jpg',
      excerpt: 'You can now listen to XL:UK Radio on your Amazon Alexa devices. Just enable our skill and say "Alexa, play XL:UK Radio".',
      category: 'Technology'
    },
    {
      id: 'listen-worldwide',
      title: 'XL:UK Radio Now Broadcasting Worldwide',
      date: 'January 10, 2025',
      image: '/images/worldwide.jpg',
      excerpt: 'XL:UK Radio is now available to listeners around the world through our website and mobile apps.',
      category: 'Expansion'
    },
    {
      id: 'frequency-placements',
      title: 'XL:UK Radio Secures New Frequency Placements',
      date: 'January 5, 2025',
      image: '/images/frequency.jpg',
      excerpt: 'We\'re excited to announce new frequency placements that will improve our coverage and signal quality across the region.',
      category: 'Technology'
    },
    {
      id: 'youtube-channel',
      title: 'XL:UK Radio Launches Official YouTube Channel',
      date: 'December 30, 2024',
      image: '/images/youtube.jpg',
      excerpt: 'Subscribe to our new YouTube channel for exclusive videos, interviews, and behind-the-scenes content from XL:UK Radio.',
      category: 'Social Media'
    },
    {
      id: 'official-app-launch',
      title: 'XL:UK Radio Launches Official Station App',
      date: 'December 25, 2024',
      image: '/images/app-launch.jpg',
      excerpt: 'Download our new official app to listen to XL:UK Radio on your mobile device, access exclusive content, and stay connected with your favourite shows.',
      category: 'Technology'
    },
    {
      id: 'arena-partnership',
      title: 'XL:UK Radio Partners with Arena Quarter',
      date: 'December 20, 2024',
      image: '/images/arena-quarter.jpg',
      excerpt: 'We\'re proud to announce our partnership with Arena Quarter, bringing exciting new events and promotions to our listeners.',
      category: 'Partnership'
    },
    {
      id: 'cardiff-dab-radio',
      title: 'XL:UK Radio Joins Cardiff DAB Radio',
      date: 'December 15, 2024',
      image: '/images/cardiff-dab.jpg',
      excerpt: 'XL:UK Radio is now available on Cardiff DAB Radio, expanding our reach to more listeners in the Cardiff area.',
      category: 'Expansion'
    },
    {
      id: 'join-4the-region',
      title: 'XL:UK Radio Joins 4TheRegion',
      date: 'December 10, 2024',
      image: '/images/4the-region.jpg',
      excerpt: 'XL:UK Radio is proud to announce that we have joined 4TheRegion, a membership alliance working to make positive change in South West Wales.',
      category: 'Partnership'
    }
  ];

  // Filter news based on search term and active filter
  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || news.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(allNews.map(news => news.category))];

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Latest News</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay up to date with the latest happenings at XL:UK Radio and in the music world.
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-dark-lighter border border-dark-medium focus:outline-none focus:border-primary"
                id="news-search"
                name="newsSearch"
                aria-label="Search news"
                autoComplete="off"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeFilter === category 
                      ? 'bg-primary text-white' 
                      : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'
                  }`}
                >
                  {category === 'all' ? 'All News' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <NewsCard 
                key={news.id}
                title={news.title}
                date={news.date}
                image={news.image}
                excerpt={news.excerpt}
                category={news.category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No news found matching your search.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="mt-4 text-primary hover:text-primary-light"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;