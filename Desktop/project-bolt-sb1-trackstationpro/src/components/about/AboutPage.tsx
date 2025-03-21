import React, { useEffect } from 'react';
import { Info, DollarSign, Calendar, Users, HelpCircle, Mail, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Add staggered animation effect
  useEffect(() => {
    const staggeredItems = document.querySelectorAll('.staggered-item');
    staggeredItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-fade-in');
      }, index * 100);
    });
  }, []);
  
  const TEXT = {
    aboutTitle: t('About'),
    aboutCardTitle: t('What is TrackStation Pro?'),
    aboutSubtitle: t('Your Complete Financial Management Solution for Radio Stations'),
    aboutDescription: t('TrackStationPro is designed to help radio stations manage their finances efficiently, track expenses, income, and license payments all in one place.'),
    
    featuresTitle: t('Key Features'),
    feature1Title: t('Financial Dashboard'),
    feature1Description: t('Get a clear overview of your financial status with visual charts and upcoming payment reminders.'),
    feature2Title: t('Income Tracking'),
    feature2Description: t('Record and categorize all income sources with recurring payment tracking.'),
    feature3Title: t('Expense Management'),
    feature3Description: t('Keep track of all your expenses with detailed categorization and payment schedules.'),
    feature4Title: t('License Management'),
    feature4Description: t('Never miss a license payment with our dedicated license tracking system.'),
    
    howToUseTitle: t('How to Use'),
    howToUseDescription: t('TrackStationPro is designed to be intuitive and easy to use. Here\'s how to get started:'),
    step1: t('Dashboard: View your financial overview and upcoming payments'),
    step2: t('Income: Add and manage your income sources'),
    step3: t('Expenses: Track and categorize your expenses'),
    step4: t('Licenses: Manage your license payments and renewals'),
    step5: t('Settings: Customize the application to your preferences'),
    
    aboutUsTitle: t('Developed by XL:UK Radio'),
    aboutUsDescription: t('TrackStationPro was created by XL:UK Radio, a Swansea, UK based station dedicated to providing innovative solutions for the radio industry whether it\'s for local or commercial radio brands.'),
    
    contactTitle: t('Contact Us'),
    contactEmail: t('xlukradio@gmail.com'),
    contactWebsite: t('www.xlukradio.com'),
    
    versionInfo: t('Version 1.0.0'),
    copyright: t('\u00A9 2025 XL:UK Radio. All rights reserved.')
  };

  return (
    <div className="p-4 sm:p-6 custom-container page-transition transform-gpu sm:flex sm:flex-col sm:h-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text custom-heading tracking-wide text-center sm:text-left">{TEXT.aboutTitle}</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:flex-1 sm:min-h-0 sm:overflow-auto">
        <div className="staggered-item transform-gpu">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4 sm:mb-6 custom-card">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 mr-2 text-blue-400" />
              <h2 className="text-xl font-bold gradient-text">{TEXT.aboutCardTitle}</h2>
            </div>
            <h2 className="text-xl text-gray-300 mb-3">{TEXT.aboutSubtitle}</h2>
            <p className="text-gray-400 mb-6">{TEXT.aboutDescription}</p>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="staggered-item transform-gpu">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4 sm:mb-6 custom-card">
            <h2 className="text-xl font-bold mb-4 gradient-text">{TEXT.featuresTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  <h3 className="font-semibold text-gray-200">{TEXT.feature1Title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{TEXT.feature1Description}</p>
              </div>
              
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                  <h3 className="font-semibold text-gray-200">{TEXT.feature2Title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{TEXT.feature2Description}</p>
              </div>
              
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-red-400" />
                  <h3 className="font-semibold text-gray-200">{TEXT.feature3Title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{TEXT.feature3Description}</p>
              </div>
              
              <div className="p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  <h3 className="font-semibold text-gray-200">{TEXT.feature4Title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{TEXT.feature4Description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* How to Use Section */}
        <div className="staggered-item transform-gpu">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4 sm:mb-6 custom-card">
            <div className="flex items-center mb-4">
              <HelpCircle className="w-5 h-5 mr-2 text-yellow-400" />
              <h2 className="text-xl font-bold gradient-text">{TEXT.howToUseTitle}</h2>
            </div>
            <p className="text-gray-400 mb-4">{TEXT.howToUseDescription}</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 pl-4">
              <li>{TEXT.step1}</li>
              <li>{TEXT.step2}</li>
              <li>{TEXT.step3}</li>
              <li>{TEXT.step4}</li>
              <li>{TEXT.step5}</li>
            </ol>
          </div>
        </div>
        
        {/* About Us Section */}
        <div className="staggered-item transform-gpu">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4 sm:mb-6 custom-card">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-purple-400" />
              <h2 className="text-xl font-bold gradient-text">{TEXT.aboutUsTitle}</h2>
            </div>
            <p className="text-gray-400 mb-4">{TEXT.aboutUsDescription}</p>
            
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center mb-2">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                <h3 className="font-semibold text-gray-200">{TEXT.contactTitle}</h3>
              </div>
              <p className="text-gray-400 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {TEXT.contactEmail}
              </p>
              <p className="text-gray-400 flex items-center mt-2">
                <Globe className="w-4 h-4 mr-2" />
                {TEXT.contactWebsite}
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>{TEXT.versionInfo}</p>
          <p className="mt-1">{TEXT.copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
