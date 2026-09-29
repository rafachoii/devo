import { useCallback, useEffect, useState } from "react";
import type { FormRecord } from "../components/data/formulario";
import { analyzeForm } from "../services/gemini";
import type { DevotionalResponse } from "../types/devotional";

export function useFormInsights(form: FormRecord | null) {
    const [insights, setInsights] = useState<DevotionalResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    const refetch = useCallback(() => {
        setReloadKey((prev) => prev + 1)
    }, [])

    useEffect(() => {
        if (!form) {
            return
        }

        let cancelled = false

        const currentForm = form

        async function loadInsights() {
            setIsLoading(true)
            setError(null)

            try {
                const result = await analyzeForm(currentForm)

                if (!cancelled) {
                    setInsights(result)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'Não foi possível gerar os insights.'
                    )
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false)
                }
            }
        }

        void loadInsights()

        return () => {
            cancelled = true
        }
    }, [form?.id, reloadKey])

    return { insights, isLoading, error, refetch }
}