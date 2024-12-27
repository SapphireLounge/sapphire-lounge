import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Coffee, Wine, IceCream, Apple, GlassWater, Beer } from 'lucide-react';
import { OrderNotepad, addItemToNotepad } from '../components/OrderNotepad';

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

function Menu() {
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

  const [showNotepad, setShowNotepad] = React.useState(true);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Our Menu
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-2">
            {categories[0].description}
          </p>
          <p className="text-gray-500 text-xs mt-1 max-w-2xl mx-auto">
            {categories[0].subtitle}
          </p>
        </motion.div>

        {/* Order Notepad */}
        <div className="mb-12">
          <AnimatePresence>
            {showNotepad && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <OrderNotepad className="bg-dark-900/50 backdrop-blur-sm border border-accent-700/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shisha Menu */}
        <div className="grid gap-6 mb-12">
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-accent-700/20"
            >
              <section>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="w-5 h-5 text-primary-300" />}
                    <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                      {category.title}
                    </h2>
                  </div>
                  {category.basePrice && (
                    <span className="text-primary-300 text-base font-bold">
                      {category.basePrice}
                    </span>
                  )}
                </div>
                {category.subtitle && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                    <span className="text-accent-400">-</span>
                    <p>{category.subtitle}</p>
                  </div>
                )}
                <div className={`grid ${category.title === "House Flavours" ? "grid-cols-[1fr_1fr_1fr] auto-rows-min" : "grid-cols-2 sm:grid-cols-3"} gap-1`}>
                  {category.items.map((item, i) => (
                    <div 
                      key={typeof item === 'string' ? item : item.name}
                      className={`flex items-start justify-between text-gray-300 hover:text-primary-300 transition-colors cursor-pointer p-1 rounded-lg hover:bg-dark-800/50 w-full ${category.title === "House Flavours" ? "min-w-0" : ""}`}
                      onClick={() => {
                        const itemName = typeof item === 'string' ? item : item.name;
                        const itemPrice = typeof item === 'string' ? category.basePrice || '' : item.price || '';
                        addItemToNotepad(itemName, itemPrice);
                      }}
                    >
                      <div className={`flex items-start gap-1 ${category.title === "House Flavours" ? "min-w-0" : ""}`}>
                        <Star className="w-3 h-3 text-accent-400 flex-shrink-0 mt-1" />
                        <span className={`text-sm leading-tight ${category.title === "House Flavours" ? "break-words" : ""}`}>{typeof item === 'string' ? item : item.name}</span>
                      </div>
                      {typeof item !== 'string' && item.price && (
                        <span className={`text-primary-300 text-sm font-bold ml-2 ${category.title === "House Flavours" ? "flex-shrink-0" : ""}`}>{item.price}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ))}
        </div>

        {/* Drinks Menu */}
        <div className="grid gap-6 mb-12">
          {drinks.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-accent-700/20"
            >
              <section>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="w-5 h-5 text-primary-300" />}
                    <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                      {category.title}
                    </h2>
                  </div>
                </div>
                {category.subtitle && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                    <span className="text-accent-400">-</span>
                    <p>{category.subtitle}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {category.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="group cursor-pointer p-1 rounded-lg hover:bg-dark-800/50"
                      onClick={() => addItemToNotepad(item.name, item.price || '')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-start gap-1">
                          <Star className="w-3 h-3 text-accent-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300 group-hover:text-primary-300 transition-colors text-sm leading-tight">{item.name}</span>
                        </div>
                        <span className="text-primary-300 text-sm font-bold ml-2">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-0.5 ml-4">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ))}
        </div>

        {/* Desserts Menu */}
        <div className="grid gap-6">
          {desserts.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-accent-700/20"
            >
              <section>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {category.icon && <category.icon className="w-5 h-5 text-primary-300" />}
                    <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                      {category.title}
                    </h2>
                  </div>
                </div>
                {category.subtitle && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs italic mb-2">
                    <span className="text-accent-400">-</span>
                    <p>{category.subtitle}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {category.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="group cursor-pointer p-1 rounded-lg hover:bg-dark-800/50"
                      onClick={() => addItemToNotepad(item.name, item.price || '')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-start gap-1">
                          <Star className="w-3 h-3 text-accent-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300 group-hover:text-primary-300 transition-colors text-sm leading-tight">{item.name}</span>
                        </div>
                        <span className="text-primary-300 text-sm font-bold ml-2">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-gray-500 text-xs mt-0.5 ml-4">{item.description}</p>
                      )}
                    </div>
                  ))}
                  {category.extras && (
                    <div className="col-span-full mt-2">
                      <h3 className="text-lg font-medium text-primary-300 mb-1">Extras</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {category.extras.map((extra, i) => (
                          <div
                            key={extra.name}
                            className="flex justify-between items-center text-sm text-gray-300 p-1 rounded-lg hover:bg-dark-800/50 cursor-pointer"
                            onClick={() => addItemToNotepad(extra.name, extra.price || '')}
                          >
                            <div className="flex items-start gap-1">
                              <Star className="w-3 h-3 text-accent-400 flex-shrink-0 mt-1" />
                              <span className="text-sm leading-tight">{extra.name}</span>
                            </div>
                            <span className="text-primary-300 text-sm font-bold ml-2">{extra.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;