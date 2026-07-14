export interface PropertyGalleryProps {
  images: string[]
}

const PropertyGallery = ({ images }: PropertyGalleryProps) => (
  <section aria-label="Property photos">
    {/* TODO: render the image grid and open a lightbox on click. */}
    <p className="text-sm text-gray-500">{images.length} photo(s)</p>
  </section>
)

export default PropertyGallery
