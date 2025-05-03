import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  link?: string
  linkText?: string
}

export function EmptyState({ title, description, link, linkText }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6">
        <div className="h-12 w-12" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      {link && linkText && (
        <Button asChild className="mt-4">
          <Link href={link}>{linkText}</Link>
        </Button>
      )}
    </div>
  )
}
