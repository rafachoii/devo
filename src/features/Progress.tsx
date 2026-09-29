interface StepProgressProps {
    currentStep: number
    totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
    const progress = (currentStep / totalSteps) * 100

    return (
        <div className="mb-4">
            <p className="text-base md:text-lg text-secondary mb-4 tracking-tight">
                Passo {currentStep} de {totalSteps}
            </p>
            <div className="bg-gray h-1 w-full overflow-hidden rounded-full">
                <div
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin={1}
                    aria-valuemax={totalSteps}
                    aria-label={`Passo ${currentStep} de ${totalSteps}`}
                    className="bg-red h-full rounded-full transition-all duration-300"
                    style={{width: `${progress}%`}}
                />
            </div>
        </div>
    )
}