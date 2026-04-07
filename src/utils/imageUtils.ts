import { Multimedia, MultimediaObject, LegacyMultimedia } from '../types/article';
import { MIN_IMAGE_WIDTH } from '../constants';

interface ResolvedImage {
  url: string;
  width: number;
  height: number;
  caption?: string;
  copyright?: string;
}

function isLegacyFormat(mm: Multimedia): mm is LegacyMultimedia[] {
  return Array.isArray(mm);
}

function isObjectFormat(mm: Multimedia): mm is MultimediaObject {
  return typeof mm === 'object' && !Array.isArray(mm) && mm !== null;
}

export const getBestImage = (multimedia: Multimedia | undefined): ResolvedImage | null => {
  if (!multimedia) return null;

  if (isObjectFormat(multimedia)) {
    const img = multimedia.default || multimedia.thumbnail;
    if (!img?.url) return null;
    return {
      url: img.url,
      width: img.width,
      height: img.height,
      caption: multimedia.caption,
      copyright: multimedia.credit,
    };
  }

  if (isLegacyFormat(multimedia) && multimedia.length > 0) {
    const images = multimedia.filter((m) => m.type === 'image');
    if (images.length === 0) return null;
    const large = images.find((img) => img.width >= MIN_IMAGE_WIDTH);
    const picked = large || images[0];
    return {
      url: picked.url.startsWith('http') ? picked.url : `https://static01.nyt.com/${picked.url}`,
      width: picked.width,
      height: picked.height,
      caption: picked.caption,
      copyright: picked.copyright,
    };
  }

  return null;
};
