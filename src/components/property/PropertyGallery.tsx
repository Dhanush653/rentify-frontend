import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { ImageOff, Maximize2 } from 'lucide-react'
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
      <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 sm:h-96">
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
        className="group relative block h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-96"
        aria-label="Open fullscreen image viewer"
      >
        <img
          key={activeImage}
          src={activeImage}
          alt={`${title} — photo ${activeIndex + 1} of ${images.length}`}
          className="animate-fade-in h-full w-full cursor-zoom-in object-cover transition duration-300 group-hover:scale-[1.02]"
        />

        {/* Image counter */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {activeIndex + 1} / {images.length}
        </span>

        {/* Fullscreen affordance */}
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-black/50 text-white opacity-0 transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </span>
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
                  ? 'border-blue-600'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                loading="lazy"
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
        plugins={[Counter]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        animation={{ fade: 300 }}
      />
    </div>
  )
}

export default PropertyGallery
