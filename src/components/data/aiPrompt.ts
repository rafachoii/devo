import type { FormRecord } from "./formulario";

const RESPONSE_SCHEMA = `{
    "title": {
        "content": "<Tema principal do plano devocional>"
    }
    "description": {
        "content": "<Breve introdução sobre o propósito do plano de acordo com o tema principal e o objetivo espiritual>"
    }
    "targetPublic": {
        "content": "<Público alvo do plano definido pelo usuário>"
    }
    "weeksDetailed": [
        {
            "week": {
                "content": "<Identificação sequencial da respectiva semana de acordo com a duração do plano: Semana 1, Semana 2, Semana 3...>"
            }
            "subtitle": {
                "content": "<Subtema da semana em torno do tema principal e do objetivo espiritual do plano>"
            }
            "scripture": {
                "items": ["<Passagens dos livros da Bíblia referentes à leitura da respectiva semana (Exemplo: 'Salmos 23:1-3', 'Filipenses 4:6-7')>"]
            }
            "reflection": {
                "items": ["<Pergunta(s) chave(s) para reflexão profunda da leitura semanal>"]
            }
            "practical": {
                "items": ["<Ação ou desafio prático relacionado ao subtema / reflexão principal da semana>"]
            }
            "motivation": {
                "content": "<Mensagem final encorajadora e personalizada, apontando sempre para os atributos de Jesus relacionados ao tema, como inspiração a se tornar semelhante a Ele>"
            }
        }
    ]
}`

export function buildAPIPrompt(form: FormRecord) {
    const { theme, weeks, books, target, goal } = form

    return `Você é um conselheiro cristão e teólogo experiente.
    Analise os dados abaixo e gere um plano de devocional personalizado com linguagem clara, encorajadora e objetiva. O plano será exibido diretamente ao usuário no app. Fale sempre em segunda pessoa (conjugue os verbos no singular ou no plural de acordo com o público definido pelo usuário).

    Dados do formulário:
    - Tema principal: ${theme}
    - Duração do plano: ${weeks} semanas
    - Quantidade de livros diferentes para cada semana: ${books} livros
    - Público alvo do plano: ${target}
    - Objetivo espiritual do plano: ${goal}

    Retorne apenas um JSON válido, sem texto adicional, sem blocos de código, no exato formato especificado em ${RESPONSE_SCHEMA}

    Regras:
    - Todos os textos em português do Brasil
    - Respeite estritamente os inputs do usuário:
        - Não altere o tema principal
        - Não altere a duração
        - Não altere a quantidade de livros
        - Não altere o público alvo
        - Não altere o objetivo espiritual do plano
    - Não repita conteúdos ou informações entre seções
    - Nunca use markdown dentro dos valores JSON
    - Não adultere o conteúdo bíblico ou seu significado:
        - Sua função é ser uma ferramenta útil para gerar planos de devocional com propósito
        - Você não deve distorcer a verdade bíblica
        - Não invente promessas que não estão presentes na Bíblia
        - Priorize a versão NVI da Bíblia
    `
}