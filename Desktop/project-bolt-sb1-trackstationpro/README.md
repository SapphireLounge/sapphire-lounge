# TrackStation Pro

A modern application for tracking expenses, licenses, and financial data.

## Features

- Dashboard with summary cards and expense charts
- License tracking and management
- Expense tracking and categorization
- Multi-language support
- Dark mode UI

## Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## CSS Linting Issues

If you're seeing errors like "Unknown at rule @tailwind" in your CSS files, here are several ways to fix them:

### Option 1: Use the provided VSCode settings

1. Copy the `vscode-settings.json` file to your `.vscode/settings.json`:
   ```bash
   mkdir -Force .vscode
   cp vscode-settings.json .vscode/settings.json
   ```
2. Restart VSCode or reload the window (Ctrl+Shift+P, then type "Reload Window")

### Option 2: Use the stylelint-disable comments

We've already added `stylelint-disable` comments to the CSS files to suppress these warnings. If you see new warnings in other CSS files, you can add:

```css
/* stylelint-disable-next-line */
.your-class {
  @apply tailwind-classes;
}
```

### Option 3: Install VSCode extensions

1. Install the "Tailwind CSS IntelliSense" extension
2. Install the "Stylelint" extension

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/hooks`: Custom React hooks
  - `/pages`: Application pages
  - `/utils`: Utility functions
  - `/locales`: Internationalization files

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run lint:css`: Run Stylelint for CSS files
