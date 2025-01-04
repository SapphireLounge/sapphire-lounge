import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Coffee, Wine, IceCream, Apple, GlassWater, Beer, ChevronDown } from 'lucide-react';
import { OrderNotepad } from '../components/OrderNotepad';
import { useDeviceType } from '../hooks/useDeviceType';
import { AnimatedMenuItem } from '../components/AnimatedMenuItem';
import { useOrder } from '../contexts/orderContextDefs';

interface MenuItem {
  name: string;
  price?: string;
  ingredients?: string;
  description?: string;
}

interface OrderItem {
  name: string;
  // Add other properties if needed
}

interface BaseMenuCategory {
  title: string;
  subtitle?: string;
  description?: string;
  note?: string;
  icon?: React.ElementType;
}

interface ShishaCategory extends BaseMenuCategory {
  basePrice?: string;
  items: (string | MenuItem)[];
}

interface DrinksCategory extends BaseMenuCategory {
  items: MenuItem[];
}

interface DessertsCategory extends BaseMenuCategory {
  items: MenuItem[];
  extras?: MenuItem[];
}

export const Menu = () => {
  const showNotepad = true;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const { addItem, selectedItems, setSelectedItems } = useOrder();

  useEffect(() => {
    const handleOrderUpdate = (event: CustomEvent) => {
      const items = event.detail.items.map((item: OrderItem) => item.name);
      setSelectedItems(items); // Sync selected items with order items
    };

    window.addEventListener('orderUpdated', handleOrderUpdate as EventListener);
    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate as EventListener);
    };
  }, [setSelectedItems]);

  const categories: ShishaCategory[] = [
    {
      title: "",
      description: "Explore our selection of premium shisha flavours & refreshments",
      subtitle: "Expertly crafted shisha experience with non-tobacco and nicotine-free flavours for a healthier session",
      note: "",
      items: []
    },
    {
      title: "House Flavours",
      subtitle: "Recommended double blends by customers (Any House Flavour Shisha Combo with Drinks - £16)",
      basePrice: "£12.00",
      icon: Flame,
      items: [
        "Double Apple",
        "Grape & Mint",
        "Skittles & Irn Bru",
        "Love 66 & Lady Killer",
        "Strawberry & Watermelon",
        "Mango Tango",
        "Mango & Strawberry",
        "Fizzy Cola & Watermelon",
        "Mango & Pineapple",
        "Blue Mist & Strawberry",
        "Frozen Raspberry & Frozen Blueberry",
        "Cherry & Mint"
      ]
    },
    {
      title: "Standard Single Flavours",
      subtitle: "Mix and match any two flavours to create your own unique double blend",
      basePrice: "£12.00",
      icon: Flame,
      items: [
        "Apple", "Mint", "Lemon", "Blueberry", "Strawberry",
        "Watermelon", "Mango", "Pineapple", "Grape", "Cherry",
        "Blue Mist", "Fizzy Cola", "Frozen Raspberry", "Frozen Blueberry",
        "Gummy Bear", "Love 66", "Lady Killer", "Peach", "Vanilla", "Pomegranate",
        "Lychee"
      ]
    },
    {
      title: "Premium Flavours",
      subtitle: "Exclusive signature blends crafted for an extraordinary shisha experience",
      basePrice: "£18.00",
      icon: Flame,
      items: [
        "Queen & Jungle Juice",
        "Caprioska & Lychee",
        "Blueberry Muffin",
        "Bubblegum & Pink Lemonade",
        "Strawberry Cheesecake",
        "Raspberry & Vanilla",
        "Gummy Bear Explosion",
        "Mixed Fruits",
        "Berry Blast",
        "Tropical Punch",
        "Dubai Night & Love 66",
        "Bubblegum Galore"
      ]
    },
    {
      title: "Shisha Extras",
      subtitle: "Customize Your Experience",
      icon: Flame,
      items: [
        { name: "Ice Base", price: "£2.00" },
        { name: "Large Head", price: "£2.00" },
        { name: "Additional Flavour", price: "£6.00" }
      ]
    }
  ];

  const drinks: DrinksCategory[] = [
    {
      title: "Soft Drinks",
      subtitle: "Refreshing Zero Sugar Options",
      icon: GlassWater,
      items: [
        { name: "Pepsi Max", price: "£2.00" },
        { name: "Barr Bubblegum", price: "£2.00" },
        { name: "Salaam Cola", price: "£2.00" },
        { name: "Sprite Zero", price: "£2.00" },
        { name: "Fanta Orange Zero", price: "£2.00" },
        { name: "Irn Bru Wild Berry Slush", price: "£2.00" },
        { name: "Dr Pepper Zero", price: "£2.00" },
        { name: "Barr Raspberryade", price: "£2.00" },
        { name: "Spindrift", price: "£2.00" },
        { name: "Vimto Zero", price: "£2.00" }
      ]
    },
    {
      title: "House Drinks",
      subtitle: "Hot & Cold Refreshments",
      icon: Coffee,
      items: [
        { name: "Tea", price: "£2.50" },
        { name: "Coffee", price: "£2.50" },
        { name: "Arabic Tea", price: "£2.50" },
        { name: "Still Water", price: "£1.50" }
      ]
    },
    {
      title: "Energy Drinks",
      subtitle: "Premium Zero-Sugar Energy Boosters",
      icon: Beer,
      items: [
        { name: "Monster Ultra Watermelon", price: "£2.50" },
        { name: "Monster Ultra Paradise", price: "£2.50" },
        { name: "Monster Ultra Violet", price: "£2.50" },
        { name: "Monster Ultra Blue", price: "£2.50" },
        { name: "Monster Ultra Fiesta Mango", price: "£2.50" },
        { name: "Monster Ultra Peachy Keen", price: "£2.50" },
        { name: "Monster Ultra Gold", price: "£2.50" },
        { name: "Monster Ultra Red", price: "£2.50" },
        { name: "Monster Zero Ultra", price: "£2.50" },
        { name: "Redbull", price: "£2.50" },
        { name: "Lucozade Pink Lemonade Zero", price: "£2.50" },
        { name: "Lucozade Orange Zero", price: "£2.50" }
      ]
    },
    {
      title: "Mocktails",
      subtitle: "Expertly crafted alcohol-free cocktails bursting with unique flavors",
      icon: Wine,
      items: [
        { name: "Virgin Mojito", price: "£5.00", description: "Fresh lime, mint, sugar syrup, soda" },
        { name: "Strawberry Daiquiri", price: "£5.00", description: "Fresh strawberries, lime juice, sugar syrup" },
        { name: "Piña Colada", price: "£5.00", description: "Pineapple juice, coconut cream, cream" },
        { name: "Passion Fruit Mojito", price: "£5.00", description: "Fresh passion fruit, lime, mint, sugar syrup, soda" },
        { name: "Blue Lagoon", price: "£5.00", description: "Blue curacao syrup, lemonade, lime juice, cherry garnish" },
        { name: "Tropical Sunset", price: "£5.00", description: "Mango, passion fruit, orange juice, grenadine, lime" }
      ]
    },
    {
      title: "Popular Milkshakes",
      subtitle: "Indulgent, creamy blends topped with whipped cream & premium garnishes",
      icon: GlassWater,
      items: [
        { name: "Nutella", price: "£4.00" },
        { name: "Strawberry", price: "£4.00" },
        { name: "Vanilla", price: "£4.00" }
      ]
    },
    {
      title: "Smoothies",
      subtitle: "Handcrafted blends of fresh fruits & superfoods for the perfect refreshing boost",
      icon: Apple,
      items: [
        {
          name: "Dragon Fruit Smoothie",
          price: "£5.00",
          description: "Fresh dragon fruit, coconut water, hint of lime"
        },
        {
          name: "Berry Blast Smoothie",
          price: "£5.00",
          description: "Mixed berries, apple juice, honey"
        },
        {
          name: "Tropical Paradise Smoothie",
          price: "£5.00",
          description: "Mango, pineapple, passion fruit, coconut water"
        },
        {
          name: "Protein Shake",
          price: "£5.00",
          description: "Banana, chocolate protein powder, almond milk, honey"
        },
        {
          name: "Green Energy Smoothie",
          price: "£5.00",
          description: "Spinach, kiwi, green apple, cucumber, mint"
        },
        {
          name: "Peanut Butter Power",
          price: "£5.00",
          description: "Peanut butter, banana, oat milk, dates, cinnamon"
        }
      ]
    }
  ];

  const desserts: DessertsCategory[] = [
    {
      title: "Ice-Cream",
      subtitle: "Classic flavours with optional toppings",
      icon: IceCream,
      items: [
        { 
          name: "Vanilla", 
          description: "Smooth and creamy classic vanilla ice cream",
          price: "£3.00" 
        },
        { 
          name: "Chocolate", 
          description: "Rich and indulgent chocolate ice cream",
          price: "£3.00" 
        },
        { 
          name: "Strawberry", 
          description: "Sweet and refreshing strawberry ice cream",
          price: "£3.00" 
        },
        { 
          name: "Mega Sundae", 
          description: "Three scoops of your choice with chocolate sauce, whipped cream, nuts, and a cherry on top",
          price: "£7.00" 
        }
      ],
      extras: [
        { name: "Whipped Cream", price: "£0.50" },
        { name: "Chocolate Sauce", price: "£0.50" },
        { name: "Strawberry Sauce", price: "£0.50" },
        { name: "Sprinkles", price: "£0.50" }
      ]
    },
    {
      title: "Chocolate Milkshakes",
      subtitle: "Indulgent milkshakes blended with your favourite chocolate bars",
      icon: GlassWater,
      items: [
        { name: "Kinder Bueno", price: "£5.00" },
        { name: "Ferrero Rocher", price: "£5.00" },
        { name: "Galaxy", price: "£5.00" },
        { name: "Milky Bar", price: "£5.00" },
        { name: "Snickers", price: "£5.00" },
        { name: "Mars", price: "£5.00" },
        { name: "Twix", price: "£5.00" },
        { name: "Bounty", price: "£5.00" },
        { name: "Maltesers", price: "£5.00" },
        { name: "Oreo", price: "£5.00" },
        { name: "M&M's", price: "£5.00" },
        { name: "Wispa", price: "£5.00" }
      ]
    },
    {
      title: "Dessert Waffles",
      subtitle: "Freshly made Belgian waffles with either choice of Ice-Cream or Whipped Cream",
      icon: IceCream,
      items: [
        { name: "Nutella & Hazelnut Pieces", price: "£6.00" },
        { name: "Kinder Bueno & Chocolate Sauce", price: "£6.00" },
        { name: "Mixed Berries & White Chocolate Sauce", price: "£6.00" },
        { name: "Lotus Biscoff & Caramel Sauce", price: "£6.00" },
        { name: "Ferrero Rocher & Chocolate Sauce", price: "£6.00" },
        { name: "Oreo & Chocolate Sauce", price: "£6.00" },
        { name: "Reeses Pieces & Chocolate Sauce", price: "£6.00" },
        { name: "Jammy Dodger & White Chocolate Sauce", price: "£6.00" },
        { name: "Banana & Nutella", price: "£6.00" },
        { name: "Strawberries & Nutella", price: "£6.00" }
      ],
      extras: [
        { name: "Ice-Cream Scoop", price: "£1.00" },
        { name: "Additional Topping", price: "£1.00" }
      ]
    }
  ];

  const handleItemSelect = (itemName: string, price?: string, category?: ShishaCategory) => {
    addItem(itemName, price || category?.basePrice || '£0.00');
  };

  const renderMenuItem = (item: string | MenuItem, categoryBasePrice?: string, category?: ShishaCategory) => {
    const itemName = typeof item === 'string' ? item : item.name;
    const isSelected = selectedItems.includes(itemName);

    if (isMobile) {
      if (typeof item === 'string') {
        return (
          <AnimatedMenuItem
            key={item}
            name={item}
            price={categoryBasePrice}
            onClick={() => handleItemSelect(item, categoryBasePrice, category)}
            isSelected={isSelected}
          />
        );
      }

      return (
        <AnimatedMenuItem
          key={item.name}
          name={item.name}
          price={item.price}
          description={item.description}
          ingredients={item.ingredients}
          onClick={() => handleItemSelect(item.name, item.price)}
          isSelected={isSelected}
        />
      );
    }

    // Desktop view
    if (typeof item === 'string') {
      return (
        <div 
          key={item}
          className="flex items-start justify-between text-gray-300 p-1 rounded-lg hover:bg-dark-800/50 cursor-pointer"
          onClick={() => handleItemSelect(item, categoryBasePrice, category)}
        >
          <div className="flex items-start gap-1 min-w-0">
            <Star className="text-accent-400 flex-shrink-0 mt-1 w-3 h-3" />
            <span className="break-words leading-tight">{item}</span>
          </div>
          {categoryBasePrice && (
            <span className="text-primary-300 font-bold ml-2 flex-shrink-0">
              {categoryBasePrice}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.name}
        className="group cursor-pointer p-2 rounded-lg hover:bg-dark-800/50"
        onClick={() => handleItemSelect(item.name, item.price)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-1">
            <Star className="text-accent-400 flex-shrink-0 mt-1 w-3 h-3" />
            <span className="text-gray-300 group-hover:text-primary-300 transition-colors leading-tight">
              {item.name}
            </span>
          </div>
          {item.price && (
            <span className="text-primary-300 font-bold ml-2">
              {item.price}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-gray-500 mt-0.5 ml-4 text-xs">
            {item.description}
          </p>
        )}
      </div>
    );
  };

  const toggleCategory = (categoryTitle: string) => {
    if (isMobile) {
      setSelectedCategory(selectedCategory === categoryTitle ? null : categoryTitle);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Our Menu
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Explore our selection of premium shisha flavours and refreshments.
          </p>
        </motion.div>

        {/* Order Notepad - Fixed bottom on mobile */}
        <div className={`${
          isMobile 
            ? 'fixed bottom-0 left-0 right-0 z-50 px-2 pb-2 pt-1 bg-gradient-to-t from-[#020B18] via-[#020B18]/95 to-transparent' 
            : 'mb-12'
        }`}>
          <AnimatePresence>
            {showNotepad && (
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20 }}
                transition={{ duration: 0.2 }}
              >
                <OrderNotepad className={`bg-dark-900/50 backdrop-blur-sm border border-accent-700/20 ${
                  isMobile ? 'rounded-xl shadow-lg max-h-[30vh] overflow-y-auto' : ''
                }`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu Sections with Mobile Accordion */}
        <div className={`grid gap-6 ${isMobile ? 'mb-8' : 'mb-12'}`}>
          {/* Shisha Menu */}
          <div className={`grid gap-2`}>
            {categories.slice(1).map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isMobile ? 0.05 : 0.1,
                  duration: isMobile ? 0.2 : 0.3 
                }}
                className={`bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-accent-700/20 ${
                  isMobile ? 'p-3' : 'p-6'
                } ${category.title === 'Shisha Extras' ? 'mb-1' : ''}`}
              >
                <section>
                  <div 
                    className="flex items-center justify-between mb-2 cursor-pointer"
                    onClick={() => toggleCategory(category.title)}
                    role="button"
                    aria-expanded={selectedCategory === category.title}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <category.icon className={`text-primary-300 ${
                          isMobile ? 'w-4 h-4' : 'w-5 h-5'
                        }`} 
                      />
                      )}
                      <h2 className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}>
                        {category.title}
                      </h2>
                    </div>
                    {isMobile && (
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          selectedCategory === category.title ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                  
                  <AnimatePresence>
                    {(!isMobile || selectedCategory === category.title) && (
                      <motion.div
                        initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                        animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.2 }}
                      >
                        {category.subtitle && (
                          <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                            <span className="text-accent-400">-</span>
                            <p>{category.subtitle}</p>
                          </div>
                        )}
                        <div className={`${
                          isMobile 
                            ? 'space-y-2' 
                            : category.title === 'House Flavours' || category.title === 'Standard Single Flavours' || category.title === 'Premium Flavours'
                              ? 'grid grid-cols-2 sm:grid-cols-3 gap-1 auto-rows-min'
                              : category.title === 'Shisha Extras' || category.title === 'House Drinks' || category.title === 'Popular Milkshakes'
                                ? 'grid grid-cols-1 sm:grid-cols-4 gap-1'
                                : category.title.includes('Drinks')
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                                  : 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                        }`}>
                          {category.items.map((item) => renderMenuItem(item, category.basePrice, category))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </motion.div>
            ))}
          </div>

          {/* Drinks Menu */}
          <div className={`grid gap-2 mt-6 ${isMobile ? 'mb-10' : ''}`}>
            {drinks.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isMobile ? 0.05 : 0.1,
                  duration: isMobile ? 0.2 : 0.3 
                }}
                className={`bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-accent-700/20 ${
                  isMobile ? 'p-3' : 'p-6'
                } ${category.title === 'Smoothies' ? 'mb-1' : ''}`}
              >
                <section>
                  <div 
                    className="flex items-center justify-between mb-2 cursor-pointer"
                    onClick={() => toggleCategory(category.title)}
                    role="button"
                    aria-expanded={selectedCategory === category.title}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <category.icon className={`text-primary-300 ${
                          isMobile ? 'w-4 h-4' : 'w-5 h-5'
                        }`} 
                      />
                      )}
                      <h2 className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}>
                        {category.title}
                      </h2>
                    </div>
                    {isMobile && (
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          selectedCategory === category.title ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {(!isMobile || selectedCategory === category.title) && (
                      <motion.div
                        initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                        animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.2 }}
                      >
                        {category.subtitle && (
                          <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                            <span className="text-accent-400">-</span>
                            <p>{category.subtitle}</p>
                          </div>
                        )}
                        <div className={`${
                          isMobile 
                            ? 'space-y-2' 
                            : category.title === 'House Flavours' || category.title === 'Standard Single Flavours' || category.title === 'Premium Flavours'
                              ? 'grid grid-cols-2 sm:grid-cols-3 gap-1 auto-rows-min'
                              : category.title === 'Shisha Extras' || category.title === 'House Drinks' || category.title === 'Popular Milkshakes'
                                ? 'grid grid-cols-1 sm:grid-cols-4 gap-1'
                                : category.title.includes('Drinks')
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                                  : 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                        }`}>
                          {category.items.map((item) => renderMenuItem(item))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </motion.div>
            ))}
          </div>

          {/* Desserts Menu */}
          <div className={`grid gap-2 ${isMobile ? '-mt-4' : 'mt-6'}`}>
            {desserts.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: isMobile ? 0.05 : 0.1,
                  duration: isMobile ? 0.2 : 0.3 
                }}
                className={`bg-dark-900/50 backdrop-blur-sm rounded-lg shadow-lg border border-accent-700/20 ${
                  isMobile ? 'p-3' : 'p-6'
                }`}
              >
                <section>
                  <div 
                    className="flex items-center justify-between mb-2 cursor-pointer"
                    onClick={() => toggleCategory(category.title)}
                    role="button"
                    aria-expanded={selectedCategory === category.title}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <category.icon className={`text-primary-300 ${
                          isMobile ? 'w-4 h-4' : 'w-5 h-5'
                        }`} 
                      />
                      )}
                      <h2 className={`font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400 ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`}>
                        {category.title}
                      </h2>
                    </div>
                    {isMobile && (
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          selectedCategory === category.title ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {(!isMobile || selectedCategory === category.title) && (
                      <motion.div
                        initial={isMobile ? { height: 0, opacity: 0 } : undefined}
                        animate={isMobile ? { height: 'auto', opacity: 1 } : undefined}
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.2 }}
                      >
                        {category.subtitle && (
                          <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                            <span className="text-accent-400">-</span>
                            <p>{category.subtitle}</p>
                          </div>
                        )}
                        <div className={`${
                          isMobile 
                            ? 'space-y-2' 
                            : category.title === 'House Flavours' || category.title === 'Standard Single Flavours' || category.title === 'Premium Flavours'
                              ? 'grid grid-cols-2 sm:grid-cols-3 gap-1 auto-rows-min'
                              : category.title === 'Shisha Extras' || category.title === 'House Drinks'
                                ? 'grid grid-cols-1 sm:grid-cols-4 gap-1'
                                : category.title.includes('Drinks')
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                                  : 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                        }`}>
                          {category.items.map((item) => renderMenuItem(item))}
                          {category.extras && (
                            <div className="col-span-full mt-2">
                              <h3 className={`font-medium text-primary-300 mb-1 ${
                                isMobile ? 'text-base' : 'text-lg'
                              }`}>
                                Extras
                              </h3>
                              <div className={`${
                                isMobile 
                                  ? 'space-y-2' 
                                  : category.title === 'House Flavours' || category.title === 'Standard Single Flavours' || category.title === 'Premium Flavours'
                                    ? 'grid grid-cols-2 sm:grid-cols-3 gap-1 auto-rows-min'
                                    : category.title === 'Shisha Extras' || category.title === 'House Drinks' || category.title === 'Popular Milkshakes'
                                      ? 'grid grid-cols-1 sm:grid-cols-4 gap-1'
                                      : category.title.includes('Drinks')
                                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                                        : 'grid grid-cols-1 sm:grid-cols-2 gap-1'
                              }`}>
                                {category.extras.map((extra) => renderMenuItem(extra))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;