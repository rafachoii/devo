import { type FormData, type FormRecord } from "../components/data/formulario";

const LOCAL_STORAGE_KEY = 'form-data';

export const useFormStorage = () => {
    const saveFormData = (formData: FormData): string => {
        const id = crypto.randomUUID();
        const record: FormRecord = { ...formData, id };

        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
        let savedData: FormRecord[] = [];

        if (storage) {
            try {
                savedData = JSON.parse(storage) as FormRecord[];
            } catch {
                savedData = [];
            }
        }

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...savedData, record])
        );

        return id;
    };

    const getFormData = (id: string): FormRecord | null => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storage) {
            return null;
        }

        try {
            const savedData = JSON.parse(storage) as FormRecord[];
            return savedData.find((record) => record.id === id) ?? null;
        } catch {
            return null;
        }
    };

    return { saveFormData, getFormData };
};