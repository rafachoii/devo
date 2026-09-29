import { buildAPIPrompt } from "../components/data/aiPrompt";
import type { FormRecord } from "../components/data/formulario";
import type { DevotionalResponse } from "../types/devotional";

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-1.5-flash';

interface GeminiPart {
    text?: string;
}

interface GeminiResponse {
    candidates?: Array<{
        content?: {
            parts?: GeminiPart[];
        };
        finishReason?: string;
    }>;
    error?: {
        message?: string;
        status?: string;
    };
}

function getApiKey(): string {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

    if (!apiKey) {
        throw new Error(
            'Defina VITE_GEMINI_API_KEY no arquivo .env.local e reinicie o servidor'
        );
    }

    return apiKey;
}

function getModel(): string {
    return import.meta.env.VITE_GEMINI_MODEL?.trim() || DEFAULT_MODEL;
}

async function fetchWithRetry(
    url: string,
    options: RequestInit,
    retries = 3,
    delay = 1500
): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);

        if (response.status !== 503 && response.status !== 429) {
            return response;
        }

        if (i < retries - 1) {
            await new Promise<void>((resolve) => setTimeout(resolve, delay * (i + 1)));
        }
    }
    return fetch(url, options);
}

function extractText(payload: GeminiResponse): string {
    const text = payload.candidates
        ?.flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part.text ?? '')
        .join('')
        .trim();

    if (!text) {
        throw new Error('A API do Gemini não retornou texto na resposta.');
    }

    return text;
}

function parseInsights(text: string): DevotionalResponse {
    const cleaned = text
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

    try {
        return JSON.parse(cleaned) as DevotionalResponse;
    } catch {
        throw new Error('Não foi possível interpretar o JSON retornado pelo Gemini.');
    }
}

export async function analyzeForm(
    form: FormRecord
): Promise<DevotionalResponse> {
    const apiKey = getApiKey();
    const model = getModel();
    const prompt = buildAPIPrompt(form);

    const response = await fetchWithRetry(
        `${GEMINI_API_URL}/${model}:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.4,
                    responseMimeType: 'application/json',
                },
            }),
        }
    );

    const payload = (await response.json()) as GeminiResponse;

    if (!response.ok) {
        if (response.status === 503) {
            throw new Error(
                'Os servidores da IA estão temporariamente sobrecarregados. Por favor, tente novamente em instantes.'
            );
        }

        throw new Error(
            payload.error?.message ??
            `Falha ao chamar o Gemini (${response.status}).`
        );
    }

    return parseInsights(extractText(payload));
}