import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"
import { formSteps, type FormStepsData } from "../components/data/formulario"
import { useFormStorage } from "../hooks/useFormStorage"

export const DevotionalForm = () => {
    const { saveFormData } = useFormStorage()
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [formData, setFormData] = useState<FormStepsData>({} as FormStepsData) 
    const totalSteps = formSteps.length
    const currentStep = formSteps[currentStepIndex]

    const handleNextStep = (value: string) => {
        const updatedFormData = {...formData, [currentStep.id]: value}
        setFormData(updatedFormData)

        if (currentStepIndex + 1 > totalSteps - 1) {
            saveFormData(updatedFormData)
            void navigate('/resultado')
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