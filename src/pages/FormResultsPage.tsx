import { CalendarClock, Goal, BookOpenText, Users, CircleCheckBig, ArrowLeft } from 'lucide-react';
import { PageHero } from '../components/shared/PageHero';
import { ResultCard } from '../features/ResultCard';
import { Button } from '../components/shared/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormStorage } from '../hooks/useFormStorage';

export function FormResultsPage() {
    const { id } = useParams<{ id: string }>();
    const { getFormData } = useFormStorage();
    const navigate = useNavigate();

    const formData = id ? getFormData(id) : null;

    if (!formData) {
        return (
            <main className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
                <h1 className="text-foreground text-2xl font-bold tracking-tight mb-2">
                    Plano não encontrado
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                    Não encontramos as respostas para este ID ou o plano expirou.
                </p>
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

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <PageHero
                title="Resultado do seu plano"
                subtitle="Com base no perfil e objetivos informados."
            />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <ResultCard
                    icon={Goal}
                    label="Tema Principal"
                    value={formData.theme}
                    subtitle="Tema principal do plano"
                />
                <ResultCard
                    icon={CalendarClock}
                    label="Duração do Plano"
                    value={formData.weeks}
                    subtitle="Tempo de duração do plano"
                />
                <ResultCard
                    icon={BookOpenText}
                    label="Livros por Semana"
                    value={formData.books}
                    subtitle="Livros diferentes da Bíblia por semana"
                />
                <ResultCard
                    icon={Users}
                    label="Público Alvo"
                    value={formData.target}
                    subtitle="Público alvo do plano"
                />
                <ResultCard
                    icon={CircleCheckBig}
                    label="Objetivo Espiritual"
                    value={formData.goal}
                    subtitle="Objetivo espiritual do plano"
                />
            </div>
        </main>
    );
}