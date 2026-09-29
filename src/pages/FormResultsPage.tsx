import { 
    CalendarClock, 
    Goal, 
    BookOpenText, 
    Users, 
    CircleCheckBig, 
    ArrowLeft, 
    Sparkles, 
    BookOpen, 
    HelpCircle, 
    CheckCircle2, 
    Heart 
} from 'lucide-react';
import { PageHero } from '../components/shared/PageHero';
import { ResultCard } from '../features/ResultCard';
import { Button } from '../components/shared/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStorage } from '../hooks/useFormStorage';
import type { DevotionalResponse } from '../types/devotional';

export function FormResultsPage() {
    const { id } = useParams<{ id: string }>();
    const { getFormData } = useFormStorage();
    const navigate = useNavigate();

    const formData = id ? getFormData(id) : null;

    if (!formData) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-20 sm:py-12 animate-in fade-in duration-500">
                <PageHero
                    title='Resultado do plano'
                    subtitle='Com base no perfil e objetivos informados.'
                />
                <Button 
                    onClick={() => navigate('/formulario')}
                    variant="primary"
                    icon={ArrowLeft}
                    iconPosition="left"
                >
                    Criar novo plano
                </Button>
            </main>
        );
    }

    const devotional: DevotionalResponse | null = (formData as any).result ?? null;

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14 animate-in fade-in duration-700">
            <PageHero
                title="Resultado do seu plano"
                subtitle="Com base no perfil e objetivos informados."
            />

            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
                <ResultCard
                    icon={Goal}
                    label="Tema Principal"
                    value={formData.theme}
                    subtitle="Tema principal do plano"
                />
                <ResultCard
                    icon={CalendarClock}
                    label="Duração"
                    value={`${formData.weeks} semanas`}
                    subtitle="Tempo total de duração"
                />
                <ResultCard
                    icon={BookOpenText}
                    label="Livros"
                    value={`${formData.books} por semana`}
                    subtitle="Livros bíblicos por semana"
                />
                <ResultCard
                    icon={Users}
                    label="Público Alvo"
                    value={formData.target}
                    subtitle="Público alvo do plano"
                />
                <ResultCard
                    icon={CircleCheckBig}
                    label="Objetivo"
                    value={formData.goal}
                    subtitle="Objetivo espiritual do plano"
                />
            </div>

            {devotional ? (
                <section className="space-y-8">
                    <div className="bg-primary rounded-2xl p-6 sm:p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] border border-gray/10">
                        <div className="flex items-center gap-2 text-secondary mb-2">
                            <Sparkles size={18} />
                            <span className="text-xs font-semibold uppercase tracking-tight">
                                Plano Gerado • {devotional.targetPublic.content}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3">
                            {devotional.title.content}
                        </h2>
                        <p className="text-sm sm:text-base text-muted leading-relaxed tracking-tight">
                            {devotional.description.content}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {devotional.weeksDetailed.map((weekItem, index) => (
                            <div 
                                key={index} 
                                className="bg-primary rounded-2xl p-6 sm:p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] border border-gray/10 space-y-6"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray/10">
                                    <span className="inline-self-start rounded-full bg-secondary text-primary px-3.5 py-1 text-xs font-bold tracking-tight">
                                        {weekItem.week.content}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                                        {weekItem.subtitle.content}
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-tight">
                                        <BookOpen size={16} />
                                        <span>Leitura da Semana (NVI)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {weekItem.scripture.items.map((item, scriptureIndex) => (
                                            <span 
                                                key={scriptureIndex}
                                                className="rounded-lg bg-secondary/10 text-foreground px-3 py-1.5 text-xs font-semibold tracking-tight border border-gray/5"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-tight">
                                        <HelpCircle size={16} />
                                        <span>Perguntas para Reflexão</span>
                                    </div>
                                    <ul className="space-y-2 pl-1">
                                        {weekItem.reflection.items.map((item, refIndex) => (
                                            <li key={refIndex} className="text-xs sm:text-sm text-foreground tracking-tight flex items-start gap-2">
                                                <span className="text-secondary font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-tight">
                                        <CheckCircle2 size={16} />
                                        <span>Desafio Prático</span>
                                    </div>
                                    <ul className="space-y-2 pl-1">
                                        {weekItem.practical.items.map((item, pracIndex) => (
                                            <li key={pracIndex} className="text-xs sm:text-sm text-foreground tracking-tight flex items-start gap-2">
                                                <span className="text-secondary font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 flex items-start gap-3">
                                    <Heart size={18} className="text-secondary shrink-0 mt-0.5" />
                                    <p className="text-xs sm:text-sm text-foreground leading-relaxed tracking-tight italic">
                                        "{weekItem.motivation.content}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="bg-primary rounded-2xl p-10 text-center border border-gray/10 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)]">
                    <Sparkles className="mx-auto mb-3 text-secondary animate-pulse" size={32} />
                    <h3 className="text-lg font-bold text-foreground tracking-tight mb-1">
                        Gerando seu plano devocional...
                    </h3>
                    <p className="text-xs text-muted tracking-tight">
                        Estamos estruturando suas leituras e reflexões personalizadas.
                    </p>
                </div>
            )}
        </main>
    );
}