import { PaymentError } from '@/utils/paymentError'
import type { RazorpaySuccessResponse } from '@/types/razorpay'

// Re-exported so callers can `import { PaymentError } from '@/utils/razorpay'`.
export { PaymentError }

/** Razorpay TEST key id — supplied via env (never a live key in the client). */
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID ?? ''

const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

/** Injects the Razorpay checkout script once and resolves when ready. */
const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export interface CheckoutOptions {
  /** Amount in rupees (converted to paise internally). */
  amount: number
  description?: string
  prefillContact?: string
}

/**
 * Opens the Razorpay checkout. Resolves on successful payment and rejects
 * with a PaymentError if the user cancels or the payment fails.
 */
export const openRazorpayCheckout = ({
  amount,
  description,
  prefillContact,
}: CheckoutOptions): Promise<RazorpaySuccessResponse> =>
  loadRazorpayScript().then((loaded) => {
    if (!loaded) throw new PaymentError('Could not load the payment gateway.')
    if (!RAZORPAY_KEY_ID) throw new PaymentError('Payment is not configured.')

    return new Promise<RazorpaySuccessResponse>((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Rentify',
        description,
        prefill: prefillContact ? { contact: prefillContact } : undefined,
        theme: { color: '#059669' },
        handler: (response) => resolve(response),
        modal: { ondismiss: () => reject(new PaymentError('Payment cancelled.')) },
      })

      rzp.on('payment.failed', () => reject(new PaymentError('Payment failed.')))
      rzp.open()
    })
  })
