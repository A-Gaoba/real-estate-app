"use client"

interface PropertyMapProps {
  address: string
}

export default function PropertyMap({ address }: PropertyMapProps) {
  // In a real app, you would use a mapping service like Google Maps or Mapbox
  // For this demo, we'll just show a placeholder

  return (
    <div className="rounded-lg overflow-hidden border h-[400px] bg-muted flex items-center justify-center">
      <div className="text-center p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 text-muted-foreground"
        >
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z" />
        </svg>
        <p className="text-muted-foreground mb-2">Map view would be displayed here</p>
        <p className="font-medium">{address}</p>
      </div>
    </div>
  )
}
