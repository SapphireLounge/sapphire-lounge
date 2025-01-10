/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-gradient-to-r',
    'from-[#833AB4]',
    'via-[#FD1D1D]',
    'to-[#FCAF45]',
    'hover:from-[#6d2e96]',
    'hover:via-[#e41818]',
    'hover:to-[#f5a333]',
    'border-[#E1306C]',
    'bg-[#1877F2]',
    'hover:bg-[#0c5dc7]',
    'border-[#1877F2]',
    'hover:bg-[#141414]',
  ],
  theme: {
    screens: {
      'xs': '375px',    // iPhone SE, smaller phones
      'sm': '390px',    // iPhone 14
      'md': '412px',    // Pixel 7
      'lg': '428px',    // iPhone 14 Pro Max
      'xl': '512px',    // Pixel 8 Pro
      '2xl': '720px',   // Tablets
      '3xl': '1024px',  // Larger tablets/desktop
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#0284c7',  // Updated for better contrast
          500: '#0369a1',
          600: '#075985',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        dark: {
          300: '#1f2937',
          400: '#111827',
          500: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'shimmer': 'shimmer 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%) translateY(-150%) rotate(45deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '20%': { opacity: '0.9' },
          '30%': { transform: 'translateX(150%) translateY(150%) rotate(45deg)', opacity: '0' },
          '100%': { transform: 'translateX(-150%) translateY(-150%) rotate(45deg)', opacity: '0' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
