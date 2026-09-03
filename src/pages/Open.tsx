import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';

export default function Open() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    if (!link.trim()) return;
    
    try {
      const url = new URL(link);
      // Navigate to the same path and search params they provided
      navigate(`${url.pathname}${url.search}`);
    } catch {
      alert('দয়া করে সঠিক লিংক দিন।');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-paper p-10 shadow-lg border border-charcoal/10 text-center"
      >
        <h2 className="font-serif text-3xl text-charcoal mb-4">চিঠি খুলুন</h2>
        <p className="font-sans text-charcoal/70 mb-8">
          আপনাকে পাঠানো চিঠির লিংকটি নিচে পেস্ট করুন।
        </p>
        
        <input
          type="text"
          placeholder="https://.../read?data=..."
          className="w-full p-4 border border-charcoal/20 bg-transparent mb-6 font-sans outline-none focus:border-maroon transition-colors"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        
        <Button onClick={handleOpen} className="w-full">
          চিঠিটি খুলুন
        </Button>
      </motion.div>
    </div>
  );
}
