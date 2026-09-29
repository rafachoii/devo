import { type FormData, type FormRecord } from "../components/data/formulario";

const LOCAL_STORAGE_KEY = 'form-data'

export const useFormStorage = () => {
    const saveFormData = (formData: FormData) => {
        const id = crypto.randomUUID()
        const record: FormRecord = {...formData, id }

        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const savedData = storage
            ? (JSON.parse(storage) as FormRecord[])
            : []
        
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...savedData, record])
        )

        return id
    }

    const getFormData = (id: string) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

        if (!storage) {
            return null
        }

        const savedData = JSON.parse(storage) as FormRecord[]
        return savedData.find((record) => record.id === id || null)
    }

    return { saveFormData, getFormData }
}