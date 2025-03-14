// Script to download project images from Unsplash
const fs = require('fs');
const path = require('path');
const https = require('https');
const { imageUrls } = require('../src/data/githubProjects');

const IMAGES_DIR = path.join(__dirname, '../public/images/projects');

// Ensure the directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log(`Created directory: ${IMAGES_DIR}`);
}

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(IMAGES_DIR, filename);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File already exists: ${filename}`);
      return resolve();
    }
    
    console.log(`Downloading: ${filename} from ${url}`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  const downloads = Object.entries(imageUrls).map(([key, url]) => {
    return downloadImage(url, `${key}.jpg`);
  });
  
  try {
    await Promise.all(downloads);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Run the download
downloadAllImages(); 