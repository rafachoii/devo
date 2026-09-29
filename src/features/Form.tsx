import { useState } from "react"
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"
import { simuationFormSteps } from "../components/data/formulario"

export const DevotionalForm = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const totalSteps = simuationFormSteps.length
    const currentStep = simuationFormSteps[currentStepIndex]

    const handleNextStep = () => {
        if (currentStepIndex + 1 > totalSteps - 1) {
            return
        }

        setCurrentStepIndex((prev) => prev + 1)
    }

    const handlePreviousStep = () => {
        if (currentStepIndex === 0) {
            return
        }

        setCurrentStepIndex((prev) => prev - 1)
    }

    return(
        <>
            <StepProgress currentStep={currentStepIndex} totalSteps={totalSteps} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
                onBack = {handlePreviousStep}
                onNext = {handleNextStep}
                hideBackButton = {currentStepIndex === 0}
            />
        </>
    )
}