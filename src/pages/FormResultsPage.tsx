import { CalendarClock, Goal, BookOpenText, Users, CircleCheckBig } from 'lucide-react';
import { PageHero } from '../components/shared/PageHero';
import { ResultCard } from '../features/ResultCard';
import { useParams } from 'react-router-dom';
import { useFormStorage } from '../hooks/useFormStorage';

export function FormResultsPage() {
    const { id } = useParams<{ id: string }>()
    const { getFormData } = useFormStorage()

    const data = id ? getFormData(id) : null
    
    if (!data) {
        return <p>Plano não encontrado</p>
    }

    return (
        <main className='mx-auto max-w-6xl px-4 py-10 sm:py-14'>
            <PageHero
                title='Resultado do seu plano'
                subtitle='Com base no perfil e objetivos.'
            />
            <div className='mb-6 grid grid-cols-1 gap-4 lg:grid-cols-5'>
                <ResultCard
                    icon={Goal}
                    label="Tema Principal"
                    value={data.theme}
                    subtitle='Tema principal do plano'
                />
                <ResultCard
                    icon={CalendarClock}
                    label="Duração do Plano"
                    value={data.weeks}
                    subtitle='Tempo de duração do plano'
                />
                <ResultCard
                    icon={BookOpenText}
                    label="Livros por Semana"
                    value={data.books}
                    subtitle='Livros diferentes da Bíblia por semana'
                />
                <ResultCard
                    icon={Users}
                    label="Público Alvo"
                    value={data.target}
                    subtitle='Público alvo do plano'
                />
                <ResultCard
                    icon={CircleCheckBig}
                    label="Objetivo Espiritual"
                    value={data.goal}
                    subtitle='Objetivo espiritual do plano'
                />
            </div>
        </main>
    )
}