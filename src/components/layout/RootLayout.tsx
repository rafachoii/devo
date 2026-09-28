import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";
import { DotGrid } from "../shared/DotGrid";

export function RootLayout() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <DotGrid className="w-full h-full opacity-50" />
            </div>
            
            <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex flex-col">
                    <Outlet />
                </main>
            </div>
            
        </div>
    )
}