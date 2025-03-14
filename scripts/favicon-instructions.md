# Favicon Setup Instructions

Follow these steps to add a proper favicon to your portfolio website:

## Step 1: Generate Favicon Files

1. Go to [favicon.io](https://favicon.io/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Create a favicon:
   - **Text-based**: Enter your initials "HKT" and customize colors/fonts
   - **Image-based**: Upload your logo or profile picture
   - **Emoji-based**: Select an emoji that represents you (on favicon.io)
3. Download the generated favicon package

## Step 2: Replace Placeholder Files

1. Extract the downloaded favicon package
2. Replace the following files in your `public/favicon/` directory:
   - `favicon.ico` (main favicon file)
   - `favicon-32x32.png` (32x32 pixel favicon)
   - `favicon-16x16.png` (16x16 pixel favicon)
   - `apple-touch-icon.png` (180x180 pixel Apple touch icon)

## Step 3: Rebuild and Redeploy

After replacing the favicon files, rebuild and redeploy your site:

```bash
# Build the site
npm run build

# Deploy to Firebase
firebase deploy
```

## Additional Information

- The favicon references are already set up in your `src/pages/_document.js` file
- Make sure all favicon files have the correct names as referenced in the HTML
- For the best compatibility across devices, include all the favicon sizes mentioned above 