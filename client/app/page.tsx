import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/toggle-theme"
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function HomePage() {
  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  return (
    <div className="h-screen">
      <header className="border-b flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-semibold">Nawin Saas</h1>

        <div className="flex items-center gap-3">
          <ModeToggle />

          {isUserAuthenticated ? (
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <RegisterLink>
                <Button variant="outline">Register</Button>
              </RegisterLink>

              <LoginLink>
                <Button>Login</Button>
              </LoginLink>
            </>
          )}
        </div>
      </header>
    </div>
  )
}
