import { DevotionalForm } from "../features/Form";
import { FormHero } from "../features/Hero";

export function FormPage() {
    return (
        <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
            <FormHero />
            <DevotionalForm />
        </main>
    )
}