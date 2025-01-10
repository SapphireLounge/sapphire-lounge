import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [192, 512];
const inputSvg = path.join(__dirname, '../src/assets/sapphire-logo-circle.svg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
    // Ensure the public directory exists
    try {
        await fs.access(outputDir);
    } catch {
        await fs.mkdir(outputDir, { recursive: true });
    }

    // First convert SVG to a large PNG
    try {
        await execAsync(`npx svgexport "${inputSvg}" "${path.join(outputDir, 'temp.png')}" 1024:1024`);
        
        // Then create different sized PNGs
        for (const size of sizes) {
            await sharp(path.join(outputDir, 'temp.png'))
                .resize(size, size)
                .toFile(path.join(outputDir, `icon-${size}.png`));
            console.log(`Generated ${size}x${size} icon`);
        }

        // Clean up temp file
        await fs.unlink(path.join(outputDir, 'temp.png'));
        console.log('PWA icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons();
