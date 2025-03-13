import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Facebook, Twitter, Link2 } from 'lucide-react';
import { useEffect } from 'react';

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample data for news
  const allNews = [
    {
      id: 'summer-festival',
      title: 'XL:UK Radio Summer Festival Announced',
      date: 'May 15, 2025',
      image: '/images/festival.jpg',
      excerpt: 'Get ready for the biggest music event of the summer! XL:UK Radio is proud to announce our annual Summer Festival, featuring top artists and DJs.',
      category: 'Events',
      content: `
        <p>XL:UK Radio is thrilled to announce the return of our annual Summer Festival, set to take place on June 15, 2025, at the City Park Amphitheatre.</p>
        
        <p>This year's festival promises to be our biggest and best yet, featuring an incredible lineup of artists across multiple stages. From chart-topping headliners to emerging local talent, there's something for every music lover.</p>
        
        <p>The main stage will feature performances from internationally acclaimed DJs and artists, while our discovery stage will showcase the best up-and-coming talent from the local scene.</p>
        
        <p>Beyond the music, festival-goers can enjoy a variety of food vendors, interactive art installations, and exclusive VIP experiences. Our expanded festival grounds will include chill-out zones, a silent disco, and much more.</p>
        
        <p>Early bird tickets go on sale next week, with a special discount for XL:UK Radio subscribers. Stay tuned to our social media channels for the full lineup announcement coming soon!</p>
      `
    },
    {
      id: 'new-dj',
      title: 'Welcoming Our New Weekend DJ',
      date: 'May 10, 2025',
      image: '/images/dj.jpg',
      excerpt: 'XL:UK Radio is excited to welcome DJ Max to our weekend lineup. Bringing fresh beats and energy to your Saturday nights.',
      category: 'Staff',
      content: `
        <p>XL:UK Radio is excited to announce the newest addition to our team of talented DJs. Starting this weekend, DJ Max will be taking over the Saturday night slot from 8 PM to midnight.</p>
        
        <p>With over a decade of experience in the industry, DJ Max has built a reputation for high-energy sets that blend the latest chart hits with underground classics. Having performed at some of the biggest clubs and festivals across the country, we're thrilled to bring his unique sound to our listeners.</p>
        
        <p>"I'm incredibly excited to join the XL:UK Radio family," says DJ Max. "I've been a long-time listener of the station, and I can't wait to bring my style and energy to Saturday nights. Expect a mix of current hits, dance classics, and some exclusive remixes you won't hear anywhere else."</p>
        
        <p>DJ Max's first show will air this Saturday at 8 PM. Tune in for what promises to be an unforgettable debut and the start of a new era for weekend radio.</p>
        
        <p>You can follow DJ Max on Instagram and Twitter @DJMaxOfficial to stay updated on his latest mixes and behind-the-scenes content.</p>
      `
    }
    // Add more news articles as needed
  ];

  const article = allNews.find(article => article.id === id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="pt-24 md:pt-32 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/news" className="btn btn-primary">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <Link to="/news" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to News
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center text-gray-400 mb-8">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{article.date}</span>
            </div>

            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="border-t border-dark-medium pt-6 mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0">
                  <p className="text-gray-400">Share this article:</p>
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primary transition-colors">
                    <Link2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsDetailPage;