import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"
import { simuationFormSteps } from "../components/data/formulario"

export const DevotionalForm = () => {
    const currentStep = simuationFormSteps[0]
    
    return(
        <>
            <StepProgress currentStep={1} totalSteps={5} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
            />
        </>
    )
}