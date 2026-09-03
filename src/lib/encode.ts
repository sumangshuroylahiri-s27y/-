import LZString from 'lz-string';
import { LetterData } from '../types';

export function encodeLetter(data: LetterData): string {
  const jsonStr = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(jsonStr);
}

export function decodeLetter(encodedStr: string): LetterData | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(encodedStr);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr) as LetterData;
  } catch (error) {
    console.error('Failed to decode letter:', error);
    return null;
  }
}
