/**
 * Script to convert image frames to WebP format
 * Run: node scripts/convert-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/images/blooms/gold');
const OUTPUT_DIR = INPUT_DIR; // Save in same directory
const INPUT_EXT = '.png'; // Converting PNG to WebP
const QUALITY = 85; // WebP quality (0-100, recommend 80-90)

async function convertToWebP() {
  try {
    // Read all files from input directory
    const files = fs.readdirSync(INPUT_DIR)
      .filter(file => file.endsWith(INPUT_EXT))
      .sort();

    console.log(`Found ${files.length} ${INPUT_EXT} files to convert...\n`);

    let converted = 0;
    let failed = 0;

    for (const file of files) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputFile = file.replace(INPUT_EXT, '.webp');
      const outputPath = path.join(OUTPUT_DIR, outputFile);

      try {
        // Get original file size
        const originalSize = fs.statSync(inputPath).size;

        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        // Get new file size
        const newSize = fs.statSync(outputPath).size;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

        console.log(`✓ ${file} → ${outputFile}`);
        console.log(`  ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${reduction}% smaller)\n`);
        
        converted++;
      } catch (err) {
        console.error(`✗ Failed to convert ${file}:`, err.message);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`Conversion complete!`);
    console.log(`✓ Converted: ${converted}`);
    if (failed > 0) console.log(`✗ Failed: ${failed}`);
    console.log('='.repeat(50));
    console.log('\nNext steps:');
    console.log('1. Update lib/utils.ts to use .webp extension');
    console.log('2. Delete old .jpg files if conversion successful');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run conversion
convertToWebP();
