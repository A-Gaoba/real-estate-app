"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  // If no images provided, use a placeholder
  const imageList = images.length > 0 ? images : ["/placeholder.svg?height=500&width=800"]

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1))
  }

  const toggleFullscreen = () => {
    setShowFullscreen((prev) => !prev)
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div className="aspect-video w-full overflow-hidden rounded-lg cursor-pointer" onClick={toggleFullscreen}>
        <img
          src={imageList[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <div
              key={index}
              className={cn(
                "h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2",
                index === currentIndex ? "border-primary" : "border-transparent",
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {imageList.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next image</span>
          </Button>
        </>
      )}

      {/* Fullscreen modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={imageList[currentIndex] || "/placeholder.svg"}
              alt={`${alt} - Fullscreen`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={toggleFullscreen}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close fullscreen</span>
            </Button>
            {imageList.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
