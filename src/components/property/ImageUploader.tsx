import { useEffect, useMemo, useRef } from 'react'
import { Button, Typography } from '@mui/material'
import { ImagePlus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { ACCEPTED_IMAGE_TYPES } from '@/utils/constants'

export interface ImageUploaderProps {
  files: File[]
  onChange: (files: File[]) => void
}

const ImageUploader = ({ files, onChange }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Object URLs for previews, recomputed when the file list changes.
  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  )

  // Revoke the previous batch of URLs on change/unmount to avoid leaks.
  useEffect(
    () => () => previews.forEach((preview) => URL.revokeObjectURL(preview.url)),
    [previews],
  )

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? [])

    const valid = selected.filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
    if (valid.length !== selected.length) {
      toast.error('Only image files (JPG, PNG, WEBP, GIF) are allowed')
    }

    if (valid.length) {
      onChange([...files, ...valid])
    }

    // Reset so selecting the same file again still fires onChange.
    event.target.value = ''
  }

  const removeAt = (index: number) =>
    onChange(files.filter((_, i) => i !== index))

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple
        hidden
        onChange={handleSelect}
      />

      <Button
        type="button"
        variant="outlined"
        onClick={() => inputRef.current?.click()}
        startIcon={<ImagePlus size={18} />}
        sx={{ textTransform: 'none', alignSelf: 'flex-start' }}
      >
        Add images
      </Button>

      {previews.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previews.map((preview, index) => (
            <div
              key={preview.url}
              className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200"
            >
              <img
                src={preview.url}
                alt={preview.file.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={`Remove ${preview.file.name}`}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white transition hover:bg-black/80"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No images selected yet.
        </Typography>
      )}
    </div>
  )
}

export default ImageUploader
