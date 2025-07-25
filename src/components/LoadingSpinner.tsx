interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Đang tải...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  )
} 