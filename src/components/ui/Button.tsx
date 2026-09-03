import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon disabled:pointer-events-none disabled:opacity-50 tracking-wide',
          {
            'bg-charcoal text-paper hover:bg-ink shadow-sm': variant === 'primary',
            'bg-cream text-charcoal hover:bg-[#EAE4D5]': variant === 'secondary',
            'border border-charcoal/20 bg-transparent hover:bg-charcoal/5': variant === 'outline',
            'hover:bg-charcoal/5 text-charcoal': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-8 text-base': size === 'md',
            'h-14 px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
