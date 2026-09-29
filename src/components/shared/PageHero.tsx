interface PageHeroProps {
    title: string;
    subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
    return (
        <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-foreground tracking-tighter leading-[1.05] mb-6 max-w-2xl">
                {title}
            </h1>
            {subtitle && (
                <p className="text-base md:text-lg text-muted leading-relaxed mb-2 max-w-md tracking-tight">
                    {subtitle}
                </p>
            )}
        </div>
    );
}