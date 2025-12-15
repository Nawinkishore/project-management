import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, Settings, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("User Info:", user);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.picture ?? ""} />
                        <AvatarFallback>{user?.given_name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="font-medium">{user?.given_name}</p>
                        <p className="text-sm text-muted-foreground">
                           {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem key={index} asChild>
                            <Link href={item.href} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-primary" />
                                {item.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="flex items-center gap-2"
                    asChild
                >
                    <LogoutLink>
                        <button className="flex items-center gap-2 w-full">
                            <LogOut className="h-4 w-4 text-primary" />
                            Logout
                        </button>
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
