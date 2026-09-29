import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"
import { formSteps, type FormData } from "../components/data/formulario"
import { useFormStorage } from "../hooks/useFormStorage"

export const DevotionalForm = () => {
    const { saveFormData } = useFormStorage()
    const navigate = useNavigate()
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [formData, setFormData] = useState<FormData>({} as FormData) 
    const totalSteps = formSteps.length
    const currentStep = formSteps[currentStepIndex]

    const handleNextStep = (value: string) => {
        const updatedFormData = {...formData, [currentStep.id]: value}
        setFormData(updatedFormData)

        if (currentStepIndex + 1 > totalSteps - 1) {
            const id = saveFormData(updatedFormData)
            void navigate(`/resultado/${id}`)
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
            <StepProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
                initialValue={formData[currentStep.id as keyof FormData] || ''}
                onBack = {handlePreviousStep}
                onNext = {handleNextStep}
                hideBackButton = {currentStepIndex === 0}
            />
        </>
    )
}