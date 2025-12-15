import Navbar from "../components/app-navbar";
import { AppSidebar } from "../components/app-sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex">
            <AppSidebar />
            <main className="w-full flex-1">
                <Navbar />
                {children}
            </main>
        </div>
    )

}
