import { motion } from 'motion/react';
import { Mail, Heart, Clock, Feather } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6">আমাদের গল্প</h1>
          <p className="font-sans text-xl text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            ডিজিটাল যুগে চিঠির হারিয়ে যাওয়া ঐতিহ্যকে ফিরিয়ে আনার এক ক্ষুদ্র প্রয়াস।
          </p>
        </motion.div>

        {/* Main Story Container */}
        <motion.div variants={itemVariants} className="paper-texture p-10 md:p-16 border border-charcoal/10 shadow-lg relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-paper rounded-full border border-charcoal/10 flex items-center justify-center">
            <Feather className="w-6 h-6 text-maroon" />
          </div>
          
          <div className="space-y-8 font-sans text-lg text-charcoal/80 leading-[2.2] mt-4">
            <h2 className="font-serif text-3xl text-maroon mb-6 text-center">আমাদের প্রেরণা</h2>
            <p>
              ইনস্ট্যান্ট মেসেজিং আর নোটিফিকেশনের এই যুগে আমরা হয়তো দ্রুত যোগাযোগ করতে শিখেছি, কিন্তু সেই যোগাযোগের গভীরতা হারিয়ে ফেলছি। একটি চিঠি কেবল কিছু শব্দের সমষ্টি নয়; এটি সময়, মনোযোগ এবং যত্নের একটি উপহার। 
            </p>
            <p>
              হলুদ খামে মোড়ানো সেই চিঠির গন্ধ, প্রিয় মানুষের হাতের লেখার স্পর্শ, এবং ডাকপিয়নের জন্য অপেক্ষার যে রোমাঞ্চ— তা আজকের নীল আলোর পর্দায় কোথাও হারিয়ে গেছে। <span className="font-serif font-bold text-maroon">চিঠি</span> প্ল্যাটফর্মটি তৈরি হয়েছে সেই নস্টালজিয়া এবং আবেগটিকে ডিজিটাল রূপ দেওয়ার জন্য।
            </p>
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl text-charcoal">বাংলা সংস্কৃতির সাথে সংযোগ</h2>
            <p className="font-sans text-lg text-charcoal/80 leading-[2.2]">
              বাংলা সাহিত্যের একটি বড় অংশ জুড়ে রয়েছে চিঠিপত্র। রবীন্দ্রনাথের 'ছিন্নপত্র' থেকে শুরু করে কাজী নজরুল ইসলামের প্রেমপত্র— চিঠি সবসময়ই আমাদের সংস্কৃতির, আমাদের অনুভূতির এক অবিচ্ছেদ্য অংশ। আমরা চেয়েছি আধুনিক প্রযুক্তির মাধ্যমে সেই সাংস্কৃতিক ধারাটিকে বাঁচিয়ে রাখতে। আমাদের ফন্ট নির্বাচন, রঙের ব্যবহার এবং শব্দ চয়নে রয়েছে খাঁটি বাঙালিয়ানার ছোঁয়া।
            </p>
          </div>
          <div className="bg-cream/50 p-10 rounded-sm border border-charcoal/5 flex justify-center items-center h-full">
            <p className="font-serif text-2xl text-maroon/80 text-center leading-loose italic">
              "বহুদিন পরে<br/>তোমার চিঠি পেয়েছি..."
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div variants={itemVariants} className="pt-12">
          <h2 className="font-serif text-3xl text-charcoal mb-12 text-center">আমাদের মূল্যবোধ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-paper border border-charcoal/5 shadow-sm rounded-sm">
              <Heart className="w-8 h-8 text-maroon mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-4">যত্নশীলতা</h3>
              <p className="font-sans text-charcoal/70 leading-relaxed">
                প্রতিটি চিঠি লেখার জন্য সময় প্রয়োজন। আমরা বিশ্বাস করি, ধীরলয়ে লেখা একটি কথা হাজারটি দ্রুত মেসেজের চেয়ে মূল্যবান।
              </p>
            </div>
            <div className="text-center p-8 bg-paper border border-charcoal/5 shadow-sm rounded-sm">
              <Mail className="w-8 h-8 text-maroon mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-4">ব্যক্তিগত পরিসর</h3>
              <p className="font-sans text-charcoal/70 leading-relaxed">
                আপনার অনুভূতি সম্পূর্ণ আপনার। আমরা এই প্ল্যাটফর্মটিকে একটি নিরাপদ ও ব্যক্তিগত স্থান হিসেবে গড়ে তুলতে বদ্ধপরিকর।
              </p>
            </div>
            <div className="text-center p-8 bg-paper border border-charcoal/5 shadow-sm rounded-sm">
              <Clock className="w-8 h-8 text-maroon mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-4">সময়ের অপেক্ষা</h3>
              <p className="font-sans text-charcoal/70 leading-relaxed">
                'ভবিষ্যতের জন্য চিঠি' ফিচারের মাধ্যমে আমরা অপেক্ষার সেই হারিয়ে যাওয়া আনন্দটিকে ফিরিয়ে আনতে চাই।
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div variants={itemVariants} className="pt-16 pb-12 text-center">
          <p className="font-sans text-xl text-charcoal/80 mb-6">কিছু কথা চিঠিতেই ভালো থাকে। আপনার প্রথম চিঠিটি আজই লিখুন।</p>
          <p className="font-serif text-xl text-maroon mb-2">ভালোবাসা সহ,</p>
          <p className="font-serif text-charcoal text-lg">সোম রায় লাহিড়ী</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
