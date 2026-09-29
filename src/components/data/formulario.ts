import { CalendarClock, Goal, BookOpenText, Users, CircleCheckBig, ArrowUpRight } from 'lucide-react';
import type { FormStepProps } from '../../features/FormStep';

export const formSteps = [
    {
        id: 'theme',
        icon: Goal,
        title: 'Tema Principal',
        question: 'Qual tema principal você deseja para o seu plano?',
        inputProps: {
            placeholder: 'Ex: Humilde como Jesus',
            maxLength: 50
        }
    },
    {
        id: 'weeks',
        icon: CalendarClock,
        title: 'Duração do Plano',
        question: 'Quantas semanas você deseja que dure o plano?',
        inputProps: {
            placeholder: 'Ex: 4',
            suffix: 'semanas',
            min: 1,
            max: 5,
            maxLength: 1
        }
    },
    {
        id: 'books',
        icon: BookOpenText,
        title: 'Livros por Semana',
        question: 'Quantos livros diferentes da Bíblia você deseja incluir na leitura semanal?',
        inputProps: {
            placeholder: 'Ex: 3',
            min: 1,
            max: 5,
            maxLength: 1
        }
    },
    {
        id: 'public',
        icon: Users,
        title: 'Público Alvo',
        question: 'Para quem é esse plano?',
        inputProps: {
            placeholder: 'Ex: Jovem de 23 anos, recém convertido',
            maxLength: 50
        }
    },
    {
        id: 'goal',
        icon: CircleCheckBig,
        title: 'Objetivo Espiritual',
        question: 'Qual o objetivo espiritual desse plano?',
        inputProps: {
            placeholder: 'Ex: Entender como agir humildemente como Jesus',
            maxLength: 50
        },
        submitButtonProps: {
            label: 'Gerar plano',
            icon: ArrowUpRight
        }
    },
] satisfies FormStepProps[]

export type FormData = Record<(typeof formSteps)[number]['id'], string>

export type FormRecord = FormData & { id: string }