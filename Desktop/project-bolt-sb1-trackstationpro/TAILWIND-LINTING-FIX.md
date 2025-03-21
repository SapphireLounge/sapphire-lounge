# Fixing Tailwind CSS Linting Issues

If you're seeing errors like "Unknown at rule @tailwind" in your CSS files, follow these steps to fix them:

## Option 1: Use the provided settings.json

1. Copy the `settings.json` file from the root directory to your `.vscode` folder:
   ```
   mkdir -Force .vscode
   cp settings.json .vscode/settings.json
   ```

2. Restart VSCode or reload the window (Ctrl+Shift+P, then type "Reload Window")

## Option 2: Manually configure VSCode settings

1. Open VSCode settings (File > Preferences > Settings or Ctrl+,)
2. Search for "css validate"
3. Uncheck "CSS > Validate: Enable"
4. Search for "stylelint validate"
5. Make sure "css" is in the list of validated languages

## Option 3: Install VSCode extensions

1. Install the "Tailwind CSS IntelliSense" extension
2. Install the "Stylelint" extension

## What we've already done

We've already set up the project with:

1. A `.stylelintrc.json` file that tells Stylelint to ignore Tailwind directives
2. Updated PostCSS configuration in `postcss.config.js` to properly process Tailwind directives
3. Created custom CSS classes in `custom.css` that don't rely on Tailwind directives

These configurations ensure that the application works correctly, but you may still see linting errors in your editor until you apply one of the solutions above.
