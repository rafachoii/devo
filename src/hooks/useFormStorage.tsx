import { type FormStepsData } from "../components/data/formulario";

const LOCAL_STORAGE_KEY = 'form-data'

export const useFormStorage = () => {
    const saveFormData = (formData: FormStepsData) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const savedData = storage
            ? (JSON.parse(storage) as FormStepsData[])
            : []
        
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...savedData, formData])
        )
    }

    return { saveFormData }
}