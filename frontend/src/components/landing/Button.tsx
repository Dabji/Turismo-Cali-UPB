import { type ButtonHTMLAttributes } from 'react';

/** Variantes visuales del botón reutilizable */
type Variant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  'inline-flex items-center justify-center gap-2 font-poppins font-semibold rounded-lg transition-all duration-300 cursor-pointer select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-coral text-white px-7 py-3 hover:brightness-110 hover:scale-105 shadow-md hover:shadow-lg',
  secondary:
    'bg-white text-navy px-7 py-3 border border-white/30 hover:bg-cream hover:scale-105',
  outline:
    'border-2 border-coral text-coral px-7 py-3 hover:bg-coral hover:text-white',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
