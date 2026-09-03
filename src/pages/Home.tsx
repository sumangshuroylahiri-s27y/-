import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import Envelope from '../components/ui/Envelope';
import { THEMES } from '../types';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal font-bold leading-tight mb-6"
          >
            কিছু কথা মুখে বলা যায় না।<br />
            <span className="text-maroon">তাই চিঠি লিখে ফেলো।</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-lg md:text-2xl text-charcoal/70 mb-12 max-w-2xl leading-relaxed"
          >
            একটা চিঠি। কিছু অনুভূতি।<br className="md:hidden" /> 
            আর এমন একজন মানুষ, যার কাছে কথাগুলো পৌঁছানো দরকার।
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center mb-20"
          >
            <Link to="/write">
              <Button size="lg" className="text-lg px-12">একটি চিঠি লিখুন</Button>
            </Link>
            <Link to="/open">
              <Button variant="secondary" size="lg" className="text-lg px-12">একটি চিঠি খুলুন</Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-8"
          >
            <div className="animate-float">
              <Envelope />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Letter Section */}
      <section className="py-24 bg-cream px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-charcoal mb-16">কেন চিঠি?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "যা মুখে বলা যায় না",
              "যা লিখলে থেকে যায়",
              "যা একদিন ফিরে পড়তে ভালো লাগে"
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-paper p-10 text-center flex items-center justify-center min-h-[200px] border border-charcoal/5 shadow-sm"
              >
                <p className="font-serif text-2xl text-charcoal">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-24 px-6 bg-paper">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-center text-charcoal mb-16">কোন ধরনের চিঠি লিখবেন?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(THEMES).map(([key, theme], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`p-8 border border-charcoal/10 flex flex-col gap-3 group cursor-pointer hover:shadow-md transition-shadow paper-texture`}
              >
                <div className={`w-10 h-10 rounded-full ${theme.accentClass} opacity-20 group-hover:opacity-100 transition-opacity`} />
                <h3 className="font-serif text-xl font-bold">{theme.label}</h3>
                <p className="font-sans text-sm opacity-70">{theme.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you need section */}
      <section className="py-32 bg-charcoal text-paper px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-16 text-paper/80">চিঠি লিখতে আপনার যা লাগবে</h2>
          <div className="flex flex-col gap-6 font-serif text-4xl md:text-6xl font-light">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>একটু সময়।</motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}>কিছু অনুভূতি।</motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} className="text-gold">আর একজন মানুষ。</motion.p>
          </div>
          <div className="mt-20">
            <Link to="/write">
              <Button size="lg" className="bg-paper text-charcoal hover:bg-cream">লেখা শুরু করুন</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
