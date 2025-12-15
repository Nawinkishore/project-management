import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Error Code */}
      <p className="text-sm font-medium text-muted-foreground">
        404 ERROR
      </p>

      {/* Title */}
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-muted-foreground">
        Sorry, we couldn’t find the page you’re looking for.
        It might have been moved or deleted.
      </p>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
              <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
