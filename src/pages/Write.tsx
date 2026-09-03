import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../components/ui/Button';
import Envelope from '../components/ui/Envelope';
import { LetterData, LetterTheme, THEMES, FONTS } from '../types';
import { encodeLetter } from '../lib/encode';

type Step = 'intro' | 'draft-prompt' | 'write' | 'preview' | 'seal' | 'share';
const DRAFT_KEY = 'chithi_draft';

export default function Write() {
  const [step, setStep] = useState<Step>('intro');
  const [isStamped, setIsStamped] = useState(false);
  const [data, setData] = useState<Partial<LetterData>>({
    theme: 'old',
    font: 'font-serif',
    align: 'left',
  });
  const [shareUrl, setShareUrl] = useState('');
  const [savedDraft, setSavedDraft] = useState<Partial<LetterData> | null>(null);

  // Auto-save draft when data changes and we are in write mode
  useEffect(() => {
    if (step === 'write' || step === 'preview') {
      if (data.content || data.recipient || data.sender || data.subject) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
      }
    }
  }, [data, step]);

  const handleStartWriting = () => {
    const draftStr = localStorage.getItem(DRAFT_KEY);
    if (draftStr) {
      try {
        const draft = JSON.parse(draftStr);
        if (draft.content || draft.recipient) {
          setSavedDraft(draft);
          setStep('draft-prompt');
          return;
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
    setStep('write');
  };

  const handleCreate = () => {
    const finalData: LetterData = {
      id: crypto.randomUUID(),
      sender: data.sender || 'অজানা',
      recipient: data.recipient || 'প্রিয় মানুষ',
      subject: data.subject || '',
      content: data.content || '',
      theme: data.theme || 'old',
      font: data.font || 'font-serif',
      align: data.align || 'left',
      createdAt: new Date().toISOString(),
    };
    
    // Check if password exists in draft, don't just default to empty if the user explicitly typed one.
    if (data.password) finalData.password = data.password;
    if (data.unlockDate) finalData.unlockDate = data.unlockDate;
    
    const encoded = encodeLetter(finalData);
    const url = `${window.location.origin}/read?data=${encoded}`;
    setShareUrl(url);
    
    // Clear draft after successful creation
    localStorage.removeItem(DRAFT_KEY);
    setStep('share');
  };

  const currentTheme = THEMES[data.theme as LetterTheme];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* STEP 1: INTRO */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-5xl mb-12 text-charcoal leading-relaxed">
              আজ কাকে কিছু বলতে<br/>ইচ্ছে করছে?
            </h2>
            <div className="animate-float">
              <Envelope 
                onClick={handleStartWriting} 
                className="mb-12"
                theme={data.theme as LetterTheme || 'old'}
              />
            </div>
            <Button onClick={handleStartWriting} variant="outline" size="lg" className="border-charcoal/30">
              চিঠি লেখা শুরু করুন
            </Button>
          </motion.div>
        )}

        {/* STEP 1.5: DRAFT PROMPT */}
        {step === 'draft-prompt' && (
          <motion.div
            key="draft-prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md bg-paper p-10 border border-charcoal/10 shadow-lg text-center"
          >
            <h2 className="font-serif text-2xl mb-4">অসমাপ্ত চিঠি পাওয়া গেছে</h2>
            <p className="font-sans opacity-70 mb-8 leading-relaxed">
              আপনার একটি অসমাপ্ত চিঠি সেভ করা আছে। আপনি কি সেটি লোড করতে চান, নাকি নতুন করে শুরু করতে চান?
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => {
                  if (savedDraft) setData(savedDraft);
                  setStep('write');
                }}
              >
                আগেরটি খুলুন
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  localStorage.removeItem(DRAFT_KEY);
                  setStep('write');
                }}
              >
                নতুন শুরু করুন
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: WRITE */}
        {step === 'write' && (
          <motion.div
            key="write"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start"
          >
            {/* Editor Sidebar (Controls) */}
            <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0 bg-paper p-6 border border-charcoal/10 rounded-sm">
              <h3 className="font-serif text-xl border-b border-charcoal/10 pb-4">চিঠির সাজসজ্জা</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans opacity-70">থিম নির্বাচন করুন</label>
                <select 
                  className="w-full p-2 border border-charcoal/20 bg-transparent font-sans"
                  value={data.theme}
                  onChange={(e) => setData({ ...data, theme: e.target.value as LetterTheme })}
                >
                  {Object.entries(THEMES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans opacity-70">ফন্ট</label>
                <select 
                  className="w-full p-2 border border-charcoal/20 bg-transparent font-sans"
                  value={data.font}
                  onChange={(e) => setData({ ...data, font: e.target.value })}
                >
                  {FONTS.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-sans opacity-70">লেখা বিন্যাস</label>
                <div className="flex gap-2">
                  {['left', 'center', 'right'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setData({ ...data, align: a as any })}
                      className={`flex-1 py-1 border ${data.align === a ? 'bg-charcoal text-paper border-charcoal' : 'border-charcoal/20 bg-transparent'}`}
                    >
                      {a === 'left' ? 'বাম' : a === 'center' ? 'মধ্য' : 'ডান'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-charcoal/10 flex flex-col gap-6">
                <h3 className="font-serif text-xl">বিশেষ অপশন</h3>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-sans opacity-70">গোপন চিঠি (পাসওয়ার্ড দিন)</label>
                  <input
                    type="text"
                    placeholder="পাসওয়ার্ড (ঐচ্ছিক)"
                    className="w-full p-2 border border-charcoal/20 bg-transparent font-sans outline-none focus:border-charcoal"
                    value={data.password || ''}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  <p className="text-xs opacity-50">পাসওয়ার্ড দিলে প্রাপককে খোলার আগে এটি দিতে হবে।</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-sans opacity-70">ভবিষ্যতের জন্য চিঠি</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-charcoal/20 bg-transparent font-sans outline-none focus:border-charcoal"
                    value={data.unlockDate || ''}
                    onChange={(e) => setData({ ...data, unlockDate: e.target.value })}
                  />
                  <p className="text-xs opacity-50">এই তারিখের আগে চিঠিটি খোলা যাবে না।</p>
                </div>
              </div>
              
              <div className="mt-8">
                 <Button onClick={() => setStep('preview')} className="w-full">চিঠি দেখুন</Button>
              </div>
            </div>

            {/* Main Writing Area (The Paper) */}
            <div className={`flex-1 w-full p-8 md:p-16 shadow-xl transition-colors duration-500 min-h-[70vh] paper-texture ${currentTheme.bgClass} ${currentTheme.textClass} ${data.font}`}>
              
              <input
                type="text"
                placeholder="প্রাপকের নাম..."
                className="w-full bg-transparent text-2xl md:text-3xl font-bold border-none outline-none mb-4 placeholder-current opacity-70"
                value={data.recipient || ''}
                onChange={(e) => setData({ ...data, recipient: e.target.value })}
              />
              
              <input
                type="text"
                placeholder="বিষয় (ঐচ্ছিক)..."
                className="w-full bg-transparent text-lg border-none outline-none mb-8 placeholder-current opacity-60 border-b border-current/20 pb-2"
                value={data.subject || ''}
                onChange={(e) => setData({ ...data, subject: e.target.value })}
              />

              <textarea
                placeholder="কোথা থেকে শুরু করব জানি না...&#10;তবু আজ কিছু কথা লিখতে ইচ্ছে হল..."
                className={`w-full h-96 bg-transparent resize-none border-none outline-none text-lg leading-loose placeholder-current opacity-90 hide-scrollbar text-${data.align}`}
                value={data.content || ''}
                onChange={(e) => setData({ ...data, content: e.target.value })}
              />

              <div className={`mt-12 text-${data.align === 'center' ? 'center' : data.align === 'right' ? 'left' : 'right'}`}>
                <p className="opacity-70 mb-2">ইতি,</p>
                <input
                  type="text"
                  placeholder="আপনার নাম..."
                  className="bg-transparent border-none outline-none text-xl font-bold placeholder-current opacity-80"
                  style={{ textAlign: data.align === 'center' ? 'center' : data.align === 'right' ? 'left' : 'right' }}
                  value={data.sender || ''}
                  onChange={(e) => setData({ ...data, sender: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: PREVIEW */}
        {step === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl flex flex-col items-center"
          >
            <div className="mb-8 flex gap-4 w-full justify-between items-center">
              <button onClick={() => setStep('write')} className="text-charcoal/60 hover:text-charcoal underline underline-offset-4">
                ফিরে যান
              </button>
              <Button onClick={() => setStep('seal')}>চিঠিটি তৈরি করুন</Button>
            </div>

            <div className={`w-full p-8 md:p-16 shadow-2xl paper-texture ${currentTheme.bgClass} ${currentTheme.textClass} ${data.font}`}>
              <h2 className="text-3xl font-bold mb-8">প্রিয় {data.recipient || '...'},</h2>
              {data.subject && <p className="text-lg mb-8 font-medium border-b border-current/20 pb-2">বিষয়: {data.subject}</p>}
              
              <div className={`text-lg leading-loose whitespace-pre-wrap text-${data.align}`}>
                {data.content || 'খালি চিঠি...'}
              </div>
              
              <div className={`mt-16 text-${data.align === 'center' ? 'center' : data.align === 'right' ? 'left' : 'right'}`}>
                <p className="opacity-80 mb-2">ইতি,</p>
                <p className="text-2xl font-bold">{data.sender || '...'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: SEAL */}
        {step === 'seal' && (
          <motion.div
            key="seal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center text-center w-full max-w-xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-charcoal">
              {isStamped ? "চিঠি সিল করা হয়েছে" : "চিঠিতে সিল মোহর দিন"}
            </h2>
            <p className="font-sans text-charcoal/70 mb-12">
              {isStamped ? "আপনার চিঠি পাঠানোর জন্য প্রস্তুত করা হচ্ছে..." : "খামের ওপর ক্লিক করে সিল মোহর যুক্ত করুন"}
            </p>
            <div className="animate-float">
              <Envelope 
                isOpen={false}
                theme={data.theme as LetterTheme || 'old'}
                isSealed={isStamped}
                animateStamp={isStamped}
                onClick={() => {
                  if (!isStamped) {
                    setIsStamped(true);
                    setTimeout(() => {
                      handleCreate();
                    }, 1500);
                  }
                }}
              />
            </div>
          </motion.div>
        )}

        {/* STEP 5: SHARE */}
        {step === 'share' && (
          <motion.div
            key="share"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl text-center bg-paper p-10 shadow-xl border border-charcoal/10"
          >
            <h2 className="font-serif text-3xl text-charcoal mb-4">চিঠিটি প্রস্তুত!</h2>
            <p className="font-sans text-charcoal/70 mb-10">আপনার সুন্দর চিঠিটি এখন পাঠানোর জন্য তৈরি।</p>
            
            <div className="bg-white p-6 inline-block mb-10 shadow-sm border border-charcoal/10 rounded-sm">
              <QRCodeSVG value={shareUrl} size={200} level="M" fgColor="#2C2C2C" />
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('লিংক কপি করা হয়েছে!');
                }}
                className="w-full"
              >
                লিংক কপি করুন
              </Button>
              
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'একটি চিঠি',
                      text: 'আপনার জন্য একটি চিঠি এসেছে।',
                      url: shareUrl,
                    });
                  }
                }}
                variant="secondary" 
                className="w-full"
              >
                শেয়ার করুন
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
