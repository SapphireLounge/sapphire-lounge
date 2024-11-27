// Navigation Types
export interface NavItem {
  path: string;
  label: string;
}

// Menu Types
export type MenuCategory = 'shisha' | 'drinks' | 'desserts';

export interface BaseMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
}

export interface ShishaItem extends BaseMenuItem {
  category: 'shisha';
  flavor: string;
  strength: 'light' | 'medium' | 'strong';
}

export interface DrinkItem extends BaseMenuItem {
  category: 'drinks';
  alcoholic: boolean;
  ingredients: string[];
}

export interface DessertItem extends BaseMenuItem {
  category: 'desserts';
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
}

export type MenuItem = ShishaItem | DrinkItem | DessertItem;

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

// Animation Types
export interface AnimationProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: {
    duration?: number;
    ease?: string | number[];
    delay?: number;
  };
}
