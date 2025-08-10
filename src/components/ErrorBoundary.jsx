import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || String(error) }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-800">
          <div className="font-semibold mb-1">Something went wrong.</div>
          <div className="text-sm">{this.state.message}</div>
          <div className="text-xs text-red-600 mt-1">Check env vars or open the browser console for details.</div>
        </div>
      )
    }
    return this.props.children
  }
}
