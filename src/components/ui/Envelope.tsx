import { cn } from '../../lib/utils';
import { LetterTheme, THEMES } from '../../types';

interface EnvelopeProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  hasShadow?: boolean;
  theme?: LetterTheme;
  isSealed?: boolean;
  animateStamp?: boolean;
}

export default function Envelope({ 
  isOpen = false, 
  onClick, 
  className, 
  hasShadow = true, 
  theme = 'old',
  isSealed = true,
  animateStamp = false
}: EnvelopeProps) {
  const currentTheme = THEMES[theme];
  const envColors = currentTheme.envelope;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-[300px] h-[200px] md:w-[400px] md:h-[260px] cursor-pointer group envelope-wrapper",
        isOpen ? "is-open" : "",
        className
      )}
    >
      {/* Shadow */}
      {hasShadow && (
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/10 blur-xl rounded-full transition-all duration-500" />
      )}
      
      {/* Back of Envelope */}
      <div 
        className={cn("absolute inset-0 rounded-sm border border-charcoal/10", currentTheme.textureClass)} 
        style={{ backgroundColor: envColors.back }}
      />

      {/* Letter Paper (Inside) */}
      <div 
        className={cn("absolute top-[10%] bottom-1 left-2 right-2 rounded-sm border border-charcoal/5 shadow-inner flex flex-col items-center pt-4 envelope-letter", currentTheme.bgClass, currentTheme.textureClass)}
      >
        {/* Subtle letter lines */}
        <div className="w-3/4 h-px bg-charcoal/10 mb-3" />
        <div className="w-2/3 h-px bg-charcoal/10 mb-3" />
        <div className="w-3/4 h-px bg-charcoal/10" />
      </div>

      {/* Front Flaps */}
      {/* Bottom flap */}
      <div 
        className={cn("absolute inset-0", currentTheme.textureClass)}
        style={{
          backgroundColor: envColors.bottom,
          clipPath: 'polygon(0% 100%, 100% 100%, 50% 45%)',
          zIndex: 20
        }}
      />
      {/* Left flap */}
      <div 
        className={cn("absolute inset-0", currentTheme.textureClass)}
        style={{
          backgroundColor: envColors.sides,
          clipPath: 'polygon(0% 0%, 0% 100%, 50% 50%)',
          zIndex: 21
        }}
      />
      {/* Right flap */}
      <div 
        className={cn("absolute inset-0", currentTheme.textureClass)}
        style={{
          backgroundColor: envColors.sides,
          clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
          zIndex: 21
        }}
      />

      {/* Top flap (Animated) */}
      <div
        className={cn("absolute inset-0 drop-shadow-sm envelope-flap", currentTheme.textureClass)}
        style={{
          backgroundColor: envColors.top,
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
        }}
      >
        {/* Wax seal */}
        {isSealed && (
          <div className={cn(
            "absolute left-1/2 bottom-[45%] -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full shadow-md flex items-center justify-center wax-seal", 
            currentTheme.accentClass,
            animateStamp ? "animate-stamp" : "opacity-90 group-hover:opacity-100 transition-opacity"
          )}>
            <span className="font-serif text-paper text-sm select-none">চিঠি</span>
          </div>
        )}
      </div>
    </div>
  );
}
