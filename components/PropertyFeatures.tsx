import { Check } from "lucide-react"

interface PropertyFeaturesProps {
  features: string[]
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  if (!features || features.length === 0) {
    return <p className="text-muted-foreground">No features listed for this property.</p>
  }

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}
