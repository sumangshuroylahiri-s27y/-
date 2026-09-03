import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { decodeLetter } from '../lib/encode';
import { LetterData, THEMES } from '../types';
import Envelope from '../components/ui/Envelope';

type ReadStep = 'envelope' | 'opening' | 'reading';

export default function Read() {
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get('data');
  const [letter, setLetter] = useState<LetterData | null>(null);
  const [step, setStep] = useState<ReadStep>('envelope');
  
  // Security states
  const [isLocked, setIsLocked] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (dataParam) {
      const decoded = decodeLetter(dataParam);
      if (decoded) {
        setLetter(decoded);
        
        if (decoded.unlockDate) {
          const unlock = new Date(decoded.unlockDate);
          const today = new Date();
          // Reset time for fair date comparison
          today.setHours(0, 0, 0, 0);
          unlock.setHours(0, 0, 0, 0);
          if (today < unlock) {
            setIsFuture(true);
          }
        }
        
        if (decoded.password && decoded.password.trim() !== '') {
          setIsLocked(true);
        }
      }
    }
  }, [dataParam]);

  if (!dataParam || !letter) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
        <p className="font-serif text-2xl text-charcoal/60">চিঠিটি পাওয়া যায়নি বা লিংকটি ভুল।</p>
      </div>
    );
  }

  const handleOpenClick = () => {
    if (isFuture) {
      // Don't open if future
      return;
    }
    
    setStep('opening');
    setTimeout(() => setStep('reading'), 2000);
  };

  const handleUnlock = () => {
    if (passwordInput === letter.password) {
      setIsLocked(false);
    } else {
      setPasswordError(true);
    }
  };

  const currentTheme = THEMES[letter.theme];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-10 px-4 relative">
      <AnimatePresence mode="wait">
        
        {/* ENVELOPE STEP */}
        {step === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            {isFuture ? (
              <div className="text-center mb-12">
                <p className="font-serif text-2xl md:text-3xl text-charcoal mb-4">এই চিঠিটি এখনও সময়ের অপেক্ষায়।</p>
                <p className="font-sans opacity-70">খোলা যাবে: {new Date(letter.unlockDate!).toLocaleDateString('bn-BD')}</p>
              </div>
            ) : isLocked ? (
              <div className="text-center mb-12 flex flex-col items-center">
                <p className="font-serif text-2xl md:text-3xl text-charcoal mb-4">এই চিঠিটি একটু ব্যক্তিগত।</p>
                <p className="font-sans opacity-70 mb-6">খুলতে পাসওয়ার্ড দিন।</p>
                <input
                  type="text"
                  className={`w-64 p-3 text-center border bg-transparent font-sans outline-none transition-colors ${passwordError ? 'border-maroon/50 text-maroon' : 'border-charcoal/20'}`}
                  placeholder="পাসওয়ার্ড"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                />
                <button 
                  onClick={handleUnlock}
                  className="mt-4 px-6 py-2 bg-charcoal text-paper text-sm hover:bg-ink transition-colors rounded-sm"
                >
                  আনলক করুন
                </button>
              </div>
            ) : (
              <p className="font-serif text-xl md:text-3xl mb-12 text-charcoal opacity-70 transition-opacity text-center">
                আপনার জন্য একটি চিঠি।
              </p>
            )}

            <div onClick={!isLocked && !isFuture ? handleOpenClick : undefined} className={`${!isLocked && !isFuture ? 'cursor-pointer group' : 'opacity-50 grayscale'}`}>
              <Envelope isOpen={false} theme={letter.theme} />
            </div>
            
            {!isLocked && !isFuture && (
              <p className="mt-12 font-sans text-sm tracking-widest uppercase text-charcoal/50 group-hover:text-charcoal transition-colors">
                খুলতে ক্লিক করুন
              </p>
            )}
          </motion.div>
        )}

        {/* OPENING STEP (Animation bridge) */}
        {step === 'opening' && (
          <motion.div
            key="opening"
            className="flex flex-col items-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
          >
            <Envelope isOpen={true} theme={letter.theme} />
          </motion.div>
        )}

        {/* READING STEP */}
        {step === 'reading' && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-3xl perspective-1000"
          >
            <div className={`w-full p-8 md:p-16 md:py-24 shadow-2xl paper-texture ${currentTheme.bgClass} ${currentTheme.textClass} ${letter.font}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-10">প্রিয় {letter.recipient},</h2>
                {letter.subject && (
                  <p className="text-lg md:text-xl mb-10 font-medium border-b border-current/20 pb-4 inline-block">
                    বিষয়: {letter.subject}
                  </p>
                )}
                
                <div className={`text-lg md:text-xl leading-[2.5] whitespace-pre-wrap text-${letter.align}`}>
                  {letter.content}
                </div>
                
                <div className={`mt-20 text-${letter.align === 'center' ? 'center' : letter.align === 'right' ? 'left' : 'right'}`}>
                  <p className="opacity-80 mb-2 italic">ইতি,</p>
                  <p className="text-2xl md:text-3xl font-bold">{letter.sender}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
