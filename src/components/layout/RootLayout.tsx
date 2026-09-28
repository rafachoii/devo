import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";
import { DotGrid } from "../shared/DotGrid";

export function RootLayout() {
    return (
        <div>
            <div className="relative min-h-screen w-full overflow-x-hidden bg-foreground">
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <DotGrid className="w-full h-full" />
                </div>
                <div className="relative z-10 flex min-h-screen flex-col">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}