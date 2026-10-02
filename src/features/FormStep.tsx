import { useState, type SyntheticEvent } from "react";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Input, type InputProps } from "../components/shared/Input";
import { Button } from "../components/shared/Button";

export interface FormStepProps {
    id: string
    icon: LucideIcon
    title: string
    question: string
    inputProps: InputProps
    initialValue?: string
    submitButtonProps?: {
        label: string
        icon?: LucideIcon
    }
}

interface ActionButtonProps {
    onBack: () => void
    onNext: (value: string) => void
    hideBackButton?: boolean
}

export function FormStep({ icon: Icon, title, question, inputProps, submitButtonProps, onBack, onNext, hideBackButton }: FormStepProps & ActionButtonProps) {
    const [inputValue, setInputValue] = useState('')
    const isNumericInput = inputProps.inputMode === 'numeric'
    const numericValue = Number(inputValue)
    const isWithinNumericRange =
        !isNumericInput ||
        (inputValue !== '' &&
            Number.isSafeInteger(numericValue) &&
            (inputProps.min === undefined || numericValue >= Number(inputProps.min)) &&
            (inputProps.max === undefined || numericValue <= Number(inputProps.max)))
    const isInputValid = Boolean(inputValue) && isWithinNumericRange

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isInputValid) {
            return
        }

        onNext(inputValue)
    }

    const handleInputChange = (value: string) => {
        if (!isNumericInput || /^\d*$/.test(value)) {
            setInputValue(value)
        }
    }

    return (
        <div className="bg-primary rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
            <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
                <Icon size={32} className="text-primary-foreground" />
            </div>
            <h2 className="text-foreground mb-6 text-xl tracking-tight">
                {title}
            </h2>
            <h3 className="text-foreground mb-6 text-xl leading-snug sm:text-2xl tracking-tight">
                {question}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input {...inputProps} value={inputValue} onChange={(e) => handleInputChange(e.target.value)} />
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                    {!hideBackButton && (
                        <Button
                            type="button"
                            variant="ghost"
                            icon={ArrowLeft}
                            iconPosition="left"
                            onClick={onBack}
                            className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1 tracking-tight"
                        >
                            Voltar
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="primary"
                        icon={!submitButtonProps ? ArrowRight : undefined}
                        disabled={!isInputValid}
                        className="order-1 flex-1 sm:order-2 tracking-tight"
                    >
                        {submitButtonProps?.label ?? 'Próximo'}

                    </Button>
                </div>
            </form>
        </div>
    )

}