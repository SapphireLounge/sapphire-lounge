# Sapphire Lounge Desktop Deployment Guide

This is the desktop-optimized version of Sapphire Lounge, serving as the main version of the site.

## Deployment Steps

1. Create a new Vercel project:
   ```bash
   vercel
   ```

2. Configure the following environment variables in Vercel:
   - `NODE_ENV=production`
   - Copy all existing environment variables from your current .env file

3. Set up the custom domain:
   - Domain: sapphirelounge.vercel.app
   - Add domain in Vercel project settings

4. Deploy the project:
   ```bash
   vercel --prod
   ```

## Important Notes

- This is the main version of the site
- The middleware will automatically route desktop users to this version
- Mobile users will be redirected to mobile.sapphirelounge.vercel.app
- Keep environment variables in sync with the mobile version
