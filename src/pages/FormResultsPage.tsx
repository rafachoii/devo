import { useRef, useState } from 'react';
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
    Heart,
    Loader2,
    AlertCircle,
    RotateCcw,
    Download
} from 'lucide-react';
import html2canvasPro from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { PageHero } from '../components/shared/PageHero';
import { ResultCard } from '../features/ResultCard';
import { Button } from '../components/shared/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStorage } from '../hooks/useFormStorage';
import { useFormInsights } from '../hooks/useFormInsights';
import type { DevotionalResponse } from '../types/devotional';

export function FormResultsPage() {
    const { id } = useParams<{ id: string }>();
    const { getFormData } = useFormStorage();
    const navigate = useNavigate();

    const formData = id ? getFormData(id) : null;
    const { insights, isLoading, error, refetch } = useFormInsights(formData);

    const devotionalRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    if (!formData) {
        return (
            <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in duration-500">
                <h1 className="text-4xl md:text-5xl lg:text-[84px] font-extrabold text-red tracking-tighter leading-[1.05] mb-14">
                    Ops! Parece que esse resultado não existe...
                </h1>
                <Button
                    onClick={() => navigate('/formulario')}
                    variant="primary"
                    icon={ArrowLeft}
                    iconPosition="left"
                    className="hover:bg-red hover:border-red transition-all duration-300"
                >
                    Criar novo plano
                </Button>
            </main>
        );
    }

    const devotional: DevotionalResponse | null = insights ?? (formData as any).result ?? null;

    const handleExportPDF = async () => {
        if (!devotionalRef.current || isExporting) return;
    
        setIsExporting(true);
    
        try {
            const element = devotionalRef.current;
    
            const canvas = await html2canvasPro(element, {
                scale: 2,
                useCORS: true,
                logging: false,
            });
    
            const imgData = canvas.toDataURL('image/jpeg', 0.98);
    
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const contentWidth = pdfWidth - margin * 2;
            const contentHeight = (canvas.height * contentWidth) / canvas.width;
    
            let heightLeft = contentHeight;
            let position = margin;
    
            pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
            heightLeft -= (pdfHeight - margin * 2);
    
            while (heightLeft > 0) {
                position = heightLeft - contentHeight + margin;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
                heightLeft -= (pdfHeight - margin * 2);
            }
    
            pdf.save(`Plano-Devocional-${formData.theme.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        } catch (err) {
            console.error('Erro ao gerar o PDF:', err);
        } finally {
            setIsExporting(false);
        }
    };

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

            {isLoading && !devotional && (
                <div className="bg-primary rounded-2xl p-12 text-center border border-gray/10 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center">
                    <Loader2 className="text-secondary animate-spin mb-4" size={36} />
                    <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">
                        Gerando seu plano devocional...
                    </h3>
                    <p className="text-sm text-muted tracking-tight max-w-md">
                        Nossa IA está analisando seus dados para estruturar leituras, perguntas de reflexão e desafios personalizados.
                    </p>
                </div>
            )}

            {error && !isLoading && !devotional && (
                <div className="bg-primary rounded-2xl p-8 sm:p-10 text-center border border-red/20 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center gap-4">
                    <AlertCircle className="text-red shrink-0" size={40} />
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-foreground tracking-tight">
                            Não foi possível gerar seu plano
                        </h3>
                        <p className="text-sm text-muted tracking-tight max-w-md mx-auto">
                            {error}
                        </p>
                    </div>
                    <Button
                        onClick={refetch}
                        variant="primary"
                        icon={RotateCcw}
                        iconPosition="left"
                        className="mt-2 text-xs"
                    >
                        Tentar novamente
                    </Button>
                </div>
            )}

            {devotional && (
                <section className="space-y-6 animate-in fade-in duration-500">
                    <div className="flex justify-end">
                        <Button
                            onClick={handleExportPDF}
                            variant="primary"
                            icon={isExporting ? Loader2 : Download}
                            iconPosition="left"
                            disabled={isExporting}
                            className="hover:bg-secondary hover:text-primary transition-all duration-300"
                        >
                            {isExporting ? 'Gerando PDF...' : 'Baixar Plano em PDF'}
                        </Button>
                    </div>

                    <div ref={devotionalRef} className="space-y-8 p-1 rounded-2xl">
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
                                    className="bg-primary rounded-2xl p-6 sm:p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] border border-gray/10 space-y-6 break-inside-avoid"
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
                    </div>
                </section>
            )}
        </main>
    );
}