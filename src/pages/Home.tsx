import { Button } from "../components/shared/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center flex-1 w-full px-6 text-center animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-[84px] font-extrabold text-foreground tracking-tighter leading-[1.05] mb-6 max-w-2xl">
                Crie seu plano<br className="hidden sm:block" /> de devocional.
            </h1>

            <p className="text-base md:text-lg text-secondary leading-relaxed mb-10 max-w-md tracking-tight">
                Desenvolvido para facilitar seu momento com Deus.<br className="hidden sm:block" />
                Não sabe como começar? Gere um plano e comece agora!
            </p>

            <Button 
                variant="primary" 
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/formulario')}
                className="tracking-tight"
            >
                Criar plano
            </Button>
        </div>
    );
}