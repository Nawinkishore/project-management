import { redirect } from "next/navigation";
import Navbar from "../components/app-navbar";
import { AppSidebar } from "../components/app-sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        redirect("/"); // Redirect to home page if not authenticated
    }
    return (
        <div className="flex">
            <AppSidebar />
            <div className="w-full flex-1">
                <Navbar />
                <main className=" mt-5">
                    {children}
                </main>
            </div>
        </div>
    )

}
