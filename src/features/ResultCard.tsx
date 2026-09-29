import type { LucideIcon } from "lucide-react";

interface CardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    subtitle: string;
    variant?: 'default' | 'primary';
}

export function ResultCard({
    icon: Icon,
    label,
    value,
    subtitle,
    variant = 'default'
}: CardProps) {
    const isPrimary = variant === 'primary';

    return (
        <div
            className={[
                'flex flex-col justify-between rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[4px_4px_22px_0px_rgba(0,0,0,0.12)] border border-gray/10',
                isPrimary ? 'bg-secondary text-primary' : 'bg-primary text-foreground'
            ].join(' ')}
        >
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <div className={[
                        'flex h-7 w-7 items-center justify-center rounded-lg',
                        isPrimary ? 'bg-primary/10 text-primary' : 'bg-secondary/5 text-secondary'
                    ].join(' ')}>
                        <Icon size={16} />
                    </div>
                    <span className={[
                        'text-xs font-semibold uppercase tracking-tight',
                        isPrimary ? 'text-primary/70' : 'text-muted'
                    ].join(' ')}>
                        {label}
                    </span>
                </div>

                <p className={[
                    'text-lg sm:text-xl font-extrabold tracking-tight leading-snug break-words',
                    isPrimary ? 'text-primary' : 'text-foreground'
                ].join(' ')}>
                    {value}
                </p>
            </div>

            <p className={[
                'mt-4 pt-2 text-xs tracking-tight border-t',
                isPrimary ? 'text-primary/60 border-primary/10' : 'text-muted border-gray/10'
            ].join(' ')}>
                {subtitle}
            </p>
        </div>
    );
}