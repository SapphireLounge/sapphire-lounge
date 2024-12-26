import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Coffee, Wine, IceCream, Apple, GlassWater, Beer } from 'lucide-react';
import { OrderNotepad } from '../components/OrderNotepad';
import { addItemToNotepad } from '../utils/notepadUtils';
import { haptics } from '../utils/haptics';

interface MenuItem {
  name: string;
  price?: string;
  ingredients?: string;
  description?: string;
}

interface BaseMenuCategory {
  title: string;
  subtitle?: string;
  description?: string;
  note?: string;
  icon?: React.ElementType;
}

interface ShishaCategory extends BaseMenuCategory {
  items: (string | MenuItem)[];
}

interface DrinksCategory extends BaseMenuCategory {
  items: MenuItem[];
}

function Menu() {
  const categories: ShishaCategory[] = [
    {
      title: "House Flavours",
      subtitle: "Recommended double blends by customers (Any House Flavour Shisha Combo with Drinks - £16)",
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
    },
    {
      title: "Ice-Cream",
      subtitle: "Classic flavours with optional toppings",
      icon: IceCream,
      items: [
        {
          name: "Vanilla Ice-Cream",
          price: "£3.50",
          description: "Classic vanilla ice cream"
        },
        {
          name: "Chocolate Ice-Cream",
          price: "£3.50",
          description: "Rich chocolate ice cream"
        },
        {
          name: "Strawberry Ice-Cream",
          price: "£3.50",
          description: "Fresh strawberry ice cream"
        }
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
        { name: "Oreo", price: "£4.00" },
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

  return (
    <div className="min-h-screen pt-16 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Our Menu</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium shisha flavours and refreshing beverages.
          </p>
        </motion.div>

        {/* Order Notepad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <OrderNotepad />
            </motion.div>
          </div>
        </motion.div>

        {/* Menu Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Shisha Categories */}
          {categories.map((category, index) => (
            <motion.div
              key={category.title || `category-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden`}
            >
              {/* Content */}
              <div className="relative z-10">
                {category.icon && (
                  <div className="flex items-center mb-4">
                    <category.icon className="w-6 h-6 text-primary-300 mr-2" />
                    <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                  </div>
                )}

                {!category.icon && category.title && (
                  <h2 className="text-xl font-semibold text-white mb-4">{category.title}</h2>
                )}

                {category.subtitle && (
                  <p className="text-gray-400 text-sm mb-4">{category.subtitle}</p>
                )}

                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={typeof item === 'string' ? item : item.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileTap={{ 
                        scale: 0.9, 
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        transition: { duration: 0.3 }
                      }}
                      transition={{ 
                        opacity: { delay: i * 0.05 },
                        scale: { type: "spring", stiffness: 500, damping: 20 }
                      }}
                      className="flex justify-between items-start cursor-pointer p-2 rounded-lg"
                      onClick={() => {
                        haptics.light();
                        typeof item === 'string' 
                          ? addItemToNotepad(item, '£12.00')
                          : addItemToNotepad(item.name, item.price ?? '£0.00')
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-primary-300 mt-0.5" />
                          <span className="text-gray-200">
                            {typeof item === 'string' ? item : item.name}
                          </span>
                        </div>
                        {typeof item !== 'string' && item.description && (
                          <p className="text-gray-400 text-sm mt-1 ml-6">{item.description}</p>
                        )}
                      </div>
                      <span className="text-primary-300 ml-4">
                        {typeof item === 'string' ? '£12.00' : item.price ?? '£0.00'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Drinks Categories */}
          {drinks.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + categories.length) * 0.1 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden"
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  {category.icon && <category.icon className="w-6 h-6 text-primary-300 mr-2" />}
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                </div>

                {category.subtitle && (
                  <p className="text-gray-400 text-sm mb-4">{category.subtitle}</p>
                )}

                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileTap={{ 
                        scale: 0.9, 
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        transition: { duration: 0.3 }
                      }}
                      transition={{ 
                        opacity: { delay: i * 0.05 },
                        scale: { type: "spring", stiffness: 500, damping: 20 }
                      }}
                      className="flex justify-between items-start cursor-pointer p-2 rounded-lg"
                      onClick={() => {
                        haptics.light();
                        addItemToNotepad(item.name, item.price ?? '£0.00')
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-primary-300 mt-0.5" />
                          <span className="text-gray-200">
                            {item.name}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-gray-400 text-sm mt-1 ml-6">{item.description}</p>
                        )}
                      </div>
                      <span className="text-primary-300 ml-4">{item.price ?? '£0.00'}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;