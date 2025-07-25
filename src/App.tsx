import { useState, useEffect } from 'react'
import './App.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

function App() {
  const [currentRoute, setCurrentRoute] = useState('/')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [toastIdCounter, setToastIdCounter] = useState(0)
  
  // Initialize route from URL
  useEffect(() => {
    const path = window.location.pathname
    setCurrentRoute(path)
    
    // Listen for browser back/forward buttons
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  // Navigation function
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path)
    setCurrentRoute(path)
  }
  
  // Sample products data
  const products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro', price: 29999000, image: '📱', category: 'Electronics' },
    { id: 2, name: 'MacBook Air M3', price: 32999000, image: '💻', category: 'Electronics' },
    { id: 3, name: 'AirPods Pro', price: 6999000, image: '🎧', category: 'Electronics' },
    { id: 4, name: 'Apple Watch', price: 9999000, image: '⌚', category: 'Electronics' },
    { id: 5, name: 'iPad Pro', price: 24999000, image: '📱', category: 'Electronics' },
    { id: 6, name: 'Sony Camera', price: 15999000, image: '📷', category: 'Electronics' },
    { id: 7, name: 'Gaming Chair', price: 3999000, image: '🪑', category: 'Furniture' },
    { id: 8, name: 'Desk Lamp', price: 899000, image: '💡', category: 'Furniture' },
    { id: 9, name: 'Samsung Galaxy', price: 22999000, image: '📱', category: 'Electronics' },
    { id: 10, name: 'Bluetooth Speaker', price: 1999000, image: '🔊', category: 'Electronics' },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  // Toast functions
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: Toast = {
      id: toastIdCounter,
      message,
      type
    }
    setToasts(prev => [...prev, newToast])
    setToastIdCounter(prev => prev + 1)

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(newToast.id)
    }, 3000)
  }

  const removeToast = (toastId: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== toastId))
  }

  // Add to cart function
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      // Update quantity for existing item
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
      showToast(`Đã tăng số lượng "${product.name}" trong giỏ hàng!`, 'success')
    } else {
      // Add new item to cart
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }])
      showToast(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success')
    }
  }

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    const product = cart.find(item => item.id === productId)
    if (product) {
      showToast(`Đã xóa "${product.name}" khỏi giỏ hàng!`, 'error')
    }
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Update quantity in cart
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Calculate total cart price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigateTo('/search')
  }

  // Get active route for navigation highlighting
  const isActive = (path: string) => {
    if (path === '/' && currentRoute === '/') return true
    if (path !== '/' && currentRoute.startsWith(path)) return true
    return false
  }

  const renderContent = () => {
    switch (currentRoute) {
      case '/':
        return (
          <div className="content">
            <h2>Sản phẩm nổi bật</h2>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      case '/search':
        return (
          <div className="content">
            <h2>Tìm kiếm</h2>
            <form onSubmit={handleSearch} className="search-container">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
            
            {searchQuery && (
              <div className="search-results">
                <h3>Kết quả tìm kiếm cho: "{searchQuery}"</h3>
                {filteredProducts.length > 0 ? (
                  <div className="products-grid">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="product-card">
                        <div className="product-image">{product.image}</div>
                        <h3>{product.name}</h3>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">{formatPrice(product.price)}</p>
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => addToCart(product)}
                        >
                          Thêm vào giỏ
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-results">Không tìm thấy sản phẩm nào!</p>
                )}
              </div>
            )}
          </div>
        )
      case '/favorites':
        return (
          <div className="content">
            <h2>Yêu thích</h2>
            <p>Chưa có sản phẩm yêu thích nào</p>
          </div>
        )
      case '/cart':
        return (
          <div className="content">
            <h2>Giỏ hàng ({cart.length} sản phẩm)</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Giỏ hàng trống</p>
                <button 
                  className="continue-shopping-btn"
                  onClick={() => navigateTo('/')}
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              <div className="cart-content">
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">{item.image}</div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">{formatPrice(item.price)}</p>
                      </div>
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="total-amount">
                    <h3>Tổng cộng: {formatPrice(getCartTotal())}</h3>
                  </div>
                  <button className="checkout-btn">
                    Thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      case '/profile':
        return (
          <div className="content">
            <h2>Hồ sơ</h2>
            <div className="profile-info">
              <div className="avatar">👤</div>
              <h3>Nguyễn Văn A</h3>
              <p>user@example.com</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="content">
            <h2>404 - Trang không tìm thấy</h2>
            <p>Trang bạn tìm kiếm không tồn tại.</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigateTo('/')}
            >
              Về trang chủ
            </button>
          </div>
        )
    }
  }

  // Get cart item count for badge
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="app">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="toast-content">
              <span className="toast-icon">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '❌'}
                {toast.type === 'info' && 'ℹ️'}
              </span>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button 
              className="toast-close"
              onClick={(e) => {
                e.stopPropagation()
                removeToast(toast.id)
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Navbar */}
      <nav className="desktop-navbar">
        <div className="navbar-content">
          <div className="logo">
            <h1 onClick={() => navigateTo('/')} style={{ cursor: 'pointer' }}>
              PWA Store
            </h1>
          </div>
          <div className="nav-links">
            <button 
              className={isActive('/') ? 'active' : ''} 
              onClick={() => navigateTo('/')}
            >
              🏠 Trang chủ
            </button>
            <button 
              className={isActive('/search') ? 'active' : ''} 
              onClick={() => navigateTo('/search')}
            >
              🔍 Tìm kiếm
            </button>
            <button 
              className={isActive('/favorites') ? 'active' : ''} 
              onClick={() => navigateTo('/favorites')}
            >
              ❤️ Yêu thích
            </button>
            <button 
              className={isActive('/cart') ? 'active' : ''} 
              onClick={() => navigateTo('/cart')}
            >
              🛒 Giỏ hàng
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </button>
            <button 
              className={isActive('/profile') ? 'active' : ''} 
              onClick={() => navigateTo('/profile')}
            >
              👤 Hồ sơ
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="mobile-header">
        <h1 onClick={() => navigateTo('/')} style={{ cursor: 'pointer' }}>
          PWA Store
        </h1>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={isActive('/') ? 'active' : ''} 
          onClick={() => navigateTo('/')}
        >
          <span className="icon">🏠</span>
          <span className="label">Trang chủ</span>
        </button>
        <button 
          className={isActive('/search') ? 'active' : ''} 
          onClick={() => navigateTo('/search')}
        >
          <span className="icon">🔍</span>
          <span className="label">Tìm kiếm</span>
        </button>
        <button 
          className={isActive('/favorites') ? 'active' : ''} 
          onClick={() => navigateTo('/favorites')}
        >
          <span className="icon">❤️</span>
          <span className="label">Yêu thích</span>
        </button>
        <button 
          className={isActive('/cart') ? 'active' : ''} 
          onClick={() => navigateTo('/cart')}
        >
          <span className="icon">
            🛒
            {getCartItemCount() > 0 && (
              <span className="cart-badge">{getCartItemCount()}</span>
            )}
          </span>
          <span className="label">Giỏ hàng</span>
        </button>
        <button 
          className={isActive('/profile') ? 'active' : ''} 
          onClick={() => navigateTo('/profile')}
        >
          <span className="icon">👤</span>
          <span className="label">Hồ sơ</span>
        </button>
      </nav>
    </div>
  )
}

export default App
