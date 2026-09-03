export interface LetterData {
  id: string;
  sender: string;
  recipient: string;
  subject?: string;
  content: string;
  theme: LetterTheme;
  font: string;
  align: 'left' | 'center' | 'right';
  password?: string;
  unlockDate?: string; // ISO date string
  createdAt: string;
}

export type LetterTheme = 
  | 'old' 
  | 'love' 
  | 'friendship' 
  | 'apology' 
  | 'unspoken' 
  | 'birthday' 
  | 'distance' 
  | 'self';

export const THEMES: Record<LetterTheme, { label: string; desc: string; bgClass: string; textClass: string; accentClass: string; textureClass: string; envelope: { back: string; bottom: string; sides: string; top: string; } }> = {
  old: { label: 'পুরনো চিঠি', desc: 'স্মৃতি জড়ানো পুরনো দিনের মতো', bgClass: 'bg-[#F4ECD8]', textClass: 'text-[#4A3F35]', accentClass: 'bg-[#8C6D53]', textureClass: 'texture-old', envelope: { back: '#D8CBB6', bottom: '#E5D6C1', sides: '#E0D0BB', top: '#E2D3BE' } },
  love: { label: 'ভালোবাসার চিঠি', desc: 'হৃদয়ের গভীরের অনুভূতি', bgClass: 'bg-[#FFF0F5]', textClass: 'text-[#4A154B]', accentClass: 'bg-[#C24C68]', textureClass: 'texture-love', envelope: { back: '#F3DEE5', bottom: '#FAEBF0', sides: '#F7E5EB', top: '#F8E8EE' } },
  friendship: { label: 'বন্ধুত্বের চিঠি', desc: 'যে বন্ধু সবসময় পাশে থাকে', bgClass: 'bg-[#F0F8FF]', textClass: 'text-[#1B365D]', accentClass: 'bg-[#4A90E2]', textureClass: 'texture-friendship', envelope: { back: '#D9E8F5', bottom: '#E6F0FA', sides: '#E0ECF7', top: '#E3EEF8' } },
  apology: { label: 'ক্ষমা চাওয়ার চিঠি', desc: 'ভুল ভাঙানোর জন্য', bgClass: 'bg-[#F5F5F5]', textClass: 'text-[#333333]', accentClass: 'bg-[#7F8C8D]', textureClass: 'paper-texture', envelope: { back: '#E0E0E0', bottom: '#F0F0F0', sides: '#E8E8E8', top: '#EAEAEA' } },
  unspoken: { label: 'না-বলা কথার চিঠি', desc: 'যে কথাগুলো বলা হয়নি', bgClass: 'bg-[#1A1A1A]', textClass: 'text-[#E0E0E0]', accentClass: 'bg-[#333333]', textureClass: 'texture-unspoken', envelope: { back: '#2A2A2A', bottom: '#333333', sides: '#2E2E2E', top: '#303030' } },
  birthday: { label: 'জন্মদিনের চিঠি', desc: 'বিশেষ দিনের শুভেচ্ছা', bgClass: 'bg-[#FFFACD]', textClass: 'text-[#8B4513]', accentClass: 'bg-[#FFA500]', textureClass: 'texture-birthday', envelope: { back: '#EBE1AA', bottom: '#F7EDB5', sides: '#F1E7B0', top: '#F4EAB2' } },
  distance: { label: 'দূরের মানুষকে', desc: 'দূরত্ব ঘুচিয়ে দিক চিঠি', bgClass: 'bg-[#E6E6FA]', textClass: 'text-[#2E0854]', accentClass: 'bg-[#8A2BE2]', textureClass: 'paper-texture', envelope: { back: '#D4CDE6', bottom: '#E0DAF2', sides: '#DCD5ED', top: '#DED8EF' } },
  self: { label: 'নিজের কাছে', desc: 'নিজের প্রতি যত্নশীল হতে', bgClass: 'bg-[#FDFBF7]', textClass: 'text-[#2C2C2C]', accentClass: 'bg-[#6B2737]', textureClass: 'paper-texture', envelope: { back: '#E8DCC4', bottom: '#F4E8D1', sides: '#EFDFCD', top: '#F0E4CE' } },
};

export const FONTS = [
  { id: 'font-serif', name: 'Noto Serif', class: 'font-serif' },
  { id: 'font-sans', name: 'Noto Sans', class: 'font-sans' },
  { id: 'font-hind', name: 'Hind Siliguri', class: 'font-hind' },
  { id: 'font-anek', name: 'Anek Bangla', class: 'font-anek' },
];
