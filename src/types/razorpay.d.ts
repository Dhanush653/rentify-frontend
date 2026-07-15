export {}

interface RazorpayInstance {
  open: () => void
  on: (event: string, handler: (response: unknown) => void) => void
}

interface RazorpayConstructorOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  image?: string
  prefill?: { name?: string; email?: string; contact?: string }
  notes?: Record<string, string>
  theme?: { color?: string }
  handler?: (response: RazorpaySuccessResponse) => void
  modal?: { ondismiss?: () => void }
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayConstructorOptions) => RazorpayInstance
  }
}
