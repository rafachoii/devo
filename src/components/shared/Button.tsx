import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
}

const baseClasses =
    'group flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-6 py-3.5 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses = {
    primary: 'bg-secondary text-primary font-semibold rounded-full hover:bg-red',
    secondary: 'bg-background text-foreground border border-gray rounded-full hover:bg-red',
    ghost: 'text-muted hover:text-foreground rounded-full hover:bg-gray/10',
}

export function Button({ 
    variant = "primary", 
    icon: Icon, 
    iconPosition = "right", 
    children, 
    className, 
    ...props 
}: ButtonProps) {
    return (
        <button {...props} className={[baseClasses, variantClasses[variant], className].filter(Boolean).join(' ')}>
            {Icon && iconPosition === "left" && (
                <Icon size={20} className="transition-transform group-hover:-translate-x-1" />
            )}
            
            <span>{children}</span>
            
            {Icon && iconPosition === "right" && (
                <Icon size={20} className="transition-transform group-hover:translate-x-1" />
            )}
        </button>
    )
}