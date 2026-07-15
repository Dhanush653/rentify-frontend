export interface SeoProps {
  title: string
  description?: string
}

/**
 * Per-page document metadata. React 19 hoists <title>/<meta> to <head>,
 * so no external helmet library is needed.
 */
const Seo = ({ title, description }: SeoProps) => (
  <>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </>
)

export default Seo
