import { Check } from "lucide-react"

interface PropertyFeaturesProps {
  features: string[]
}

export default function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-full p-1">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  )
}
