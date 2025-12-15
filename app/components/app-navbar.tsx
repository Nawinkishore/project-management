import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ModeToggle } from "./toggle-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./app-usernav";
export default async function Navbar() {
   
    return (
        <nav className="h-20 border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <SidebarTrigger className="hidden:md" />
                <div className="relative w-fit">

                    <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
                    <Input
                        className="pl-8 max-w-44"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ModeToggle />
                <UserNav />
            </div>
        </nav>
    );
}
