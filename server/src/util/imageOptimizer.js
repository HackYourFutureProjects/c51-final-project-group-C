import sharp from 'sharp';
import { logError } from './logging.js';

export const optimizeImage = async (buffer, options = {}) => {
  const { 
    width = 1200, // Max width by default
    quality = 80   // Default quality
  } = options;

  try {
    const optimized = await sharp(buffer)

      .resize({
        width: width,
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();
    
    return optimized;
  } catch (error) {
    logError('Error optimizing image:', error);
    return buffer;
  }
};

export const optimizeProfilePhoto = async (buffer) => {
  return optimizeImage(buffer, {
    width: 300,
    quality: 80
  });
};

export const optimizeTripCover = async (buffer) => {
  return optimizeImage(buffer, {
    width: 1200,
    quality: 80
  });
};

export const optimizeActivityPhoto = async (buffer) => {
  return optimizeImage(buffer, {
    width: 1200,
    quality: 80
  });
};