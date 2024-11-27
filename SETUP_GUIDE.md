# Sapphire Lounge Project Setup Guide

## Project Overview
Modern web application for Sapphire Lounge, a premium shisha lounge in Swansea, built with React, TypeScript, and Tailwind CSS.

## Core Technologies
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Vite as the build tool

## Required VS Code Extensions

### Essential Extensions
1. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`
   - Purpose: Provides autocomplete, syntax highlighting, and linting for Tailwind CSS

2. **TypeScript and JavaScript Language Features**
   - ID: `vscode.typescript-language-features`
   - Purpose: TypeScript/JavaScript support

3. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`
   - Purpose: React code snippets

4. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Purpose: Code formatting

5. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Purpose: JavaScript linting

### Recommended Extensions
1. **Auto Rename Tag**
   - ID: `formulahendry.auto-rename-tag`
   - Purpose: Automatically rename paired HTML/XML tags

2. **Path Intellisense**
   - ID: `christian-kohler.path-intellisense`
   - Purpose: Autocompletes filenames

3. **GitLens**
   - ID: `eamodio.gitlens`
   - Purpose: Git integration

4. **Material Icon Theme**
   - ID: `pkief.material-icon-theme`
   - Purpose: File icons

## Project Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install TypeScript Globally** (if not installed)
   ```bash
   npm install -g typescript
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Project Structure
- `/src`
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/styles` - Global styles and Tailwind config
  - `/assets` - Images and other static assets

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables
Make sure to create a `.env` file in the project root with the following variables:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Additional Notes
- The project uses React Router for navigation
- Framer Motion is used for animations
- Tailwind CSS is configured with custom theme values
- ESLint and Prettier are configured for code quality
