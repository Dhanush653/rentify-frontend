import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { ImageOff } from 'lucide-react'
import { cn } from '@/utils/helpers'

export interface PropertyGalleryProps {
  images: string[]
  title: string
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 sm:h-96">
        <ImageOff className="h-10 w-10" aria-hidden="true" />
        <p className="text-sm">No images available</p>
      </div>
    )
  }

  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="block h-72 w-full overflow-hidden rounded-xl border border-gray-200 sm:h-96"
        aria-label="Open image viewer"
      >
        <img
          src={activeImage}
          alt={title}
          className="h-full w-full cursor-zoom-in object-cover transition hover:opacity-95"
        />
      </button>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28',
                index === activeIndex
                  ? 'border-indigo-600'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={activeIndex}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  )
}

export default PropertyGallery
