import { useEffect, useState } from 'react';

/**
 * Preloads images to improve perceived performance
 * @param imageUrls Array of image URLs to preload
 * @returns Object with loaded state and progress
 */
export const useImagePreload = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((err) => {
        console.error('Failed to preload images:', err);
        setImagesLoaded(true); // Set to true anyway to not block the app
      });
  }, [imageUrls]);

  return { imagesLoaded, progress };
};
