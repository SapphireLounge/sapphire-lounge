# Sapphire Lounge Digital Platform

A premium shisha lounge website featuring an elegant dark theme, interactive reservations, and a loyalty program. Built with React, TypeScript, and Tailwind CSS.

> Last Build: 2024-03-16T14:30:00.000Z

## Features

- Premium dark-themed design with gradient accents
- Fully responsive layout for all devices
- Interactive table reservation system
- Three-tier loyalty program
- Digital menu showcase
- Engaging about us section
- Smooth animations and transitions
- User-friendly navigation

## Tech Stack

- **Frontend Framework:**
  - React 18
  - TypeScript
  - Vite

- **Styling & UI:**
  - Tailwind CSS
  - Framer Motion
  - Lucide React Icons

- **Development Tools:**
  - ESLint
  - PostCSS
  - Git & GitHub

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SapphireLounge/sapphire-lounge.git
   cd sapphire-lounge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Open http://localhost:5173 in your browser

## Key Components

### Reservation System
- Interactive booking interface
- Table type selection
- Guest count management
- Animated success confirmation
- Date and time selection

### Loyalty Program
- Three premium tiers:
  - Silver Membership
  - Gold Membership
  - Platinum Membership
- Subscription management
- Member benefits display
- Interactive pricing cards

### Menu Showcase
- Categorized menu items
- Visual presentation
- Detailed descriptions
- Price display

### About Section
- Company story
- Shisha culture information
- Health-conscious approach
- Premium experience details

## Responsive Design

The application features a responsive design that adapts to:
- Mobile devices
- Tablets
- Laptops
- Desktop screens

## Current Status
- Desktop version is complete and deployed to Vercel
- Mobile optimization in progress
- Contact and About pages have been updated with correct information
- Navigation and styling improvements implemented

## Development Setup
1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev -- --host
```

3. Access development server:
- Local: http://localhost:4000
- Network: http://192.168.5.227:4000 (when on same network)

## Mobile Testing Progress
- DevTools mobile debugging configured
- Contact page padding adjusted
- About page styling matched to desktop
- Navigation improvements pending

## Next Steps
1. Complete mobile responsiveness testing
2. Fix any remaining navigation issues
3. Ensure consistent styling across all device sizes
4. Test contact form functionality on mobile
5. Verify image loading and scaling on different devices

## Important Files Modified
- `src/pages/About.tsx`: Updated styling for mobile
- `src/pages/Contact.tsx`: Fixed padding and contact details
- `vite.config.ts`: Configured for network access
- Various component styling updates

## Notes
- Use Chrome DevTools (F12) for mobile debugging
- Toggle device toolbar (Ctrl+Shift+M) to test different screen sizes
- Test both portrait and landscape orientations

## Deployment

The application is deployed on:
- **Platform:** Vercel
- **Branch:** payment-integration
- **Status:** Frontend preview

## Project Structure

```
sapphire-lounge/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # Service layer
│   ├── types/         # TypeScript types
│   └── hooks/         # Custom React hooks
├── public/            # Static assets
└── config/           # Configuration files
```

## Future Enhancements

Planned future improvements include:
1. Backend API integration
2. User authentication system
3. Real payment processing
4. Email notification system
5. Reservation management system
6. Admin dashboard

## Contact

For inquiries about this project, please contact the repository owners.

## License

This project is proprietary and confidential.
