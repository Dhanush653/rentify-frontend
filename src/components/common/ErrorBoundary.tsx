import { Component, type ErrorInfo, type ReactNode } from 'react'
import GlobalErrorPage from '@/components/common/GlobalErrorPage'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Catches render-time errors anywhere in the tree and shows a safe fallback. */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Surfaced in the console for debugging; wire to a logging service if needed.
    console.error('Uncaught error:', error, info)
  }

  handleReset = (): void => {
    this.setState({ hasError: false })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <GlobalErrorPage onReset={this.handleReset} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
