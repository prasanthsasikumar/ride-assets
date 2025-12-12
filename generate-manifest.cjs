const fs = require('fs');
const path = require('path');

function scanDirectory(dir, baseUrl = '') {
  const items = [];
  
  function scan(currentPath, relativePath = '') {
    const files = fs.readdirSync(currentPath);
    
    files.forEach(file => {
      const fullPath = path.join(currentPath, file);
      const relPath = path.join(relativePath, file).replace(/\\/g, '/');
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath, relPath);
      } else if (file.match(/\.(mp4|jpg|jpeg|png|gif)$/i)) {
        items.push({
          name: file,
          path: relPath,
          url: `${baseUrl}/${relPath}`,
          size: stat.size,
          modified: stat.mtime,
          type: file.endsWith('.mp4') ? 'video' : 'image'
        });
      }
    });
  }
  
  scan(dir);
  return items;
}

const manifest = {
  generated: new Date().toISOString(),
  baseUrl: 'https://sage-sherbet-7d5a83.netlify.app',
  stories: scanDirectory('./media/stories', 'media/stories'),
  reels: scanDirectory('./media/reels', 'media/reels'),
  profile: scanDirectory('./media/profile', 'media/profile')
};

manifest.stats = {
  totalStories: manifest.stories.length,
  totalReels: manifest.reels.length,
  totalProfile: manifest.profile.length,
  totalFiles: manifest.stories.length + manifest.reels.length + manifest.profile.length
};

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
console.log('✓ Manifest generated successfully!');
console.log(`  Stories: ${manifest.stats.totalStories}`);
console.log(`  Reels: ${manifest.stats.totalReels}`);
console.log(`  Profile: ${manifest.stats.totalProfile}`);
console.log(`  Total: ${manifest.stats.totalFiles}`);
