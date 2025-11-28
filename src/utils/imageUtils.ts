import { Multimedia } from '../types/article';
import { MIN_IMAGE_WIDTH } from '../constants';

/**
 * Находит лучшее изображение из массива мультимедиа
 * @param multimedia - массив мультимедиа объектов
 * @returns лучшее изображение или null
 */
export const getBestImage = (multimedia: Multimedia[] | undefined): Multimedia | null => {
  if (!multimedia || multimedia.length === 0) return null;

  const image = multimedia.find(
    (media) =>
      media.type === 'image' &&
      media.subtype === 'photo' &&
      media.width >= MIN_IMAGE_WIDTH
  );

  return image || multimedia[0];
};

/**
 * Формирует полный URL изображения NY Times
 * @param imageUrl - относительный URL изображения
 * @returns полный URL
 */
export const getFullImageUrl = (imageUrl: string): string => {
  return `https://www.nytimes.com/${imageUrl}`;
};

