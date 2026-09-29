import { Goal } from "lucide-react"
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"

export const DevotionalForm = () => {
    return(
        <>
            <StepProgress currentStep={1} totalSteps={4} />
            <FormStep
                icon={Goal}
                title="Tema Principal"
                question="Qual tema principal você deseja para o seu plano?"
                inputProps={{
                    type: 'text',
                    placeholder: 'Ex: Humilde como Jesus'
                }}      
            >

            </FormStep>
        </>
    )
}