import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Coffee, Wine, IceCream, Apple, GlassWater, Beer, ChevronDown } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';
import { useHaptics } from '../hooks/useHaptics';
import OrderNotepad from '../components/OrderNotepad';

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

interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

export const Menu = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const { triggerHaptic } = useHaptics();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const addToOrder = (item: string | MenuItem, basePrice?: string) => {
    const name = typeof item === 'string' ? item : item.name;
    const price = typeof item === 'string' ? basePrice || '0' : item.price || '0';
    
    if (isMobile) {
      triggerHaptic('select');
    }
    
    setOrderItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.name === name);
      
      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { name, price, quantity: 1 }];
      }
    });
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  const updateOrderQuantity = (index: number, newQuantity: number) => {
    setOrderItems(prevItems => {
      const newItems = [...prevItems];
      if (newQuantity <= 0) {
        newItems.splice(index, 1);
      } else {
        newItems[index] = {
          ...newItems[index],
          quantity: newQuantity
        };
      }
      return newItems;
    });
  };

  const renderMenuItem = (item: string | MenuItem, categoryBasePrice?: string) => {
    const itemName = typeof item === 'string' ? item : item.name;
    const itemPrice = typeof item === 'string' ? categoryBasePrice : item.price;
    const isSelected = orderItems.some(orderItem => orderItem.name === itemName);

    if (isMobile) {
      return (
        <div
          key={itemName}
          className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
            isSelected 
              ? 'bg-primary-500/20 border border-primary-500/30' 
              : 'bg-dark-800/30 hover:bg-dark-800/40'
          }`}
          onClick={() => addToOrder(item, categoryBasePrice)}
        >
          <div className="flex items-start gap-2">
            <Star className={`flex-shrink-0 mt-1 w-3 h-3 ${
              isSelected ? 'text-primary-300' : 'text-accent-400'
            }`} />
            <div>
              <span className={`${isSelected ? 'text-primary-300' : 'text-gray-300'}`}>
                {itemName}
              </span>
              {typeof item !== 'string' && item.description && (
                <p className="text-gray-500 text-sm mt-0.5">{item.description}</p>
              )}
              {typeof item !== 'string' && item.ingredients && (
                <p className="text-gray-600 text-xs mt-0.5">{item.ingredients}</p>
              )}
            </div>
          </div>
          {itemPrice && (
            <span className={`ml-2 whitespace-nowrap ${
              isSelected ? 'text-primary-300' : 'text-primary-300'
            }`}>
              {itemPrice}
            </span>
          )}
        </div>
      );
    }

    return (
      <div
        key={itemName}
        onClick={() => addToOrder(item, categoryBasePrice)}
        className={`backdrop-blur-sm rounded-xl p-6 border transition-colors cursor-pointer ${
          isSelected 
            ? 'bg-primary-500/20 border-primary-500/30' 
            : 'bg-black/40 border-white/10 hover:bg-black/50'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Star className={`flex-shrink-0 mt-1 w-3 h-3 ${
              isSelected ? 'text-primary-300' : 'text-accent-400'
            }`} />
            <span className={`${isSelected ? 'text-primary-300' : 'text-gray-300'}`}>
              {itemName}
            </span>
          </div>
          {itemPrice && (
            <span className="text-primary-300 ml-4 whitespace-nowrap">
              {itemPrice}
            </span>
          )}
        </div>
      </div>
    );
  };

  const categories: (ShishaCategory | DrinksCategory | DessertsCategory)[] = [
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
    },
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
    },
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

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#020B18]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
          Our Menu
        </h1>
        <p className="text-gray-400 text-sm">
          Explore our selection of premium shisha flavours and refreshments.
        </p>
      </motion.div>

      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm italic">
          - Expertly crafted shisha experience with non-tobacco and nicotine-free flavours for a healthier session
        </p>
      </div>

      <div className="container mx-auto px-4">
        <OrderNotepad 
          className="mb-8" 
          items={orderItems}
          onRemoveItem={removeOrderItem}
          onClearAll={clearOrder}
          onUpdateQuantity={updateOrderQuantity}
        />

        <div className="space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                isMobile 
                  ? 'bg-dark-900/30 backdrop-blur-sm rounded-lg overflow-hidden'
                  : 'bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50'
              }`}
            >
              {isMobile ? (
                <>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon && (
                        <category.icon className="text-primary-300 w-5 h-5" />
                      )}
                      <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                        {category.title}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`text-primary-300 w-5 h-5 transition-transform duration-300 ${
                        expandedCategory === category.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedCategory === category.title && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          {category.subtitle && (
                            <div className="text-gray-400 text-sm italic mb-4">
                              <span className="text-accent-400">- </span>
                              {category.subtitle}
                            </div>
                          )}

                          <div className="space-y-2">
                            {'basePrice' in category
                              ? category.items.map((item) => renderMenuItem(item, category.basePrice))
                              : category.items.map((item) => renderMenuItem(item))}
                          </div>

                          {'extras' in category && category.extras && (
                            <div className="mt-6">
                              <h3 className="text-lg font-medium text-primary-300 mb-2">
                                Extras
                              </h3>
                              <div className="space-y-2">
                                {category.extras.map((extra) => renderMenuItem(extra))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    {category.icon && (
                      <category.icon className="text-primary-300 w-5 h-5" />
                    )}
                    <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
                      {category.title}
                    </h2>
                  </div>

                  {category.subtitle && (
                    <div className="text-gray-400 text-sm italic mb-4">
                      <span className="text-accent-400">- </span>
                      {category.subtitle}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {'basePrice' in category
                      ? category.items.map((item) => renderMenuItem(item, category.basePrice))
                      : category.items.map((item) => renderMenuItem(item))}
                  </div>

                  {'extras' in category && category.extras && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-primary-300 mb-2">
                        Extras
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {category.extras.map((extra) => renderMenuItem(extra))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;