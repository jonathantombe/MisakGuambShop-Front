import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import UserProfile from './components/UserProfile/Userprofile'
import UserProfileEdit from './components/UserProfile/UserProfileEdit'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ResetPasswordForm from './pages/ResetPassword/ResetPasswordForm'
import CategoryCarousel from './components/CategoryCarousel/CategoryCarousel'
import ProductDetails from './pages/SellProduct/ProductDetails'
import Category from './pages/Category/Category'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import MyPublication from './pages/MyPublications/MyPublications'
import ShipmentForm from './components/Shipment/ShipmentForm/ShipmentForm'
import CartPage from './pages/CartPage/CartPage'
import Success from './pages/Payment/Success/Success'
import Cancel from './pages/Payment/Cancel/Cancel'
import NotFound from './pages/NotFound/NotFound'
import FAQ from './pages/CustomerServices/FAQ/FAQ'
import JoinUs from './pages/CustomerServices/JoinUs/JoinUs'
import BuyNowButton from '../src/components/BuyNowButton/BuyNowButton'
import Search from './pages/Search/Search/'
import History from '../src/pages/History/History'
import ProductDescription from './pages/ProductDescription/ProductDescription'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/user/profile/edit" element={<UserProfileEdit />} />
              <Route path="/forgot-password" element={<ResetPassword />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/category" element={<CategoryCarousel />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/product/:id" element={<ProductDescription />} />
              <Route path="/search" element={<Search />} />
              <Route path="/shopping/cart" element={<CartPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/my/publications" element={<MyPublication />} />
              <Route path="/shipment/form" element={<ShipmentForm />} />
              <Route path="/payment/success" element={<Success />} />
              <Route path="/payment/cancel" element={<Cancel />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/JoinUs" element={<JoinUs />}></Route>
              <Route path="/buyNow/button" element={<BuyNowButton />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/product-description/:id"
                element={<ProductDescription />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
