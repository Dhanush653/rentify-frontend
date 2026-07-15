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

/** Build a wa.me deep link; assumes a 10-digit number is Indian (prefixes 91). */
export const whatsappLink = (number: string, message?: string): string => {
  const digits = number.replace(/\D/g, '')
  const withCountryCode = digits.length === 10 ? `91${digits}` : digits
  const base = `https://wa.me/${withCountryCode}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Format a Date as a Spring-friendly LocalDateTime string (no timezone). */
export const toLocalDateTimeString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  )
}

/** Turn a backend enum like SEMI_FURNISHED into a readable "Semi Furnished". */
export const humanizeEnum = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/** Drop keys whose value is undefined, null or an empty string (e.g. before sending query params). */
export const pruneEmpty = <T extends object>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  ) as Partial<T>

/** Build a concrete path from a route template: buildPath(ROUTES.PROPERTY_DETAILS, { id }) */
export const buildPath = (
  template: string,
  params: Record<string, string | number>,
): string =>
  Object.entries(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, String(value)),
    template,
  )
