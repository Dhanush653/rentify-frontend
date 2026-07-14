/** Join conditional class names — a dependency-free `clsx`. */
export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ')

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

export const formatDate = (value: string | Date): string =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

/** Build a concrete path from a route template: buildPath(ROUTES.PROPERTY_DETAILS, { id }) */
export const buildPath = (
  template: string,
  params: Record<string, string | number>,
): string =>
  Object.entries(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, String(value)),
    template,
  )
