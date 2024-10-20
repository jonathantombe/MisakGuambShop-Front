import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import UserProfile from './components/UserProfile/Userprofile'
import UserProfileEdit from './components/UserProfile/UserProfileEdit'
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ResetPasswordForm from './pages/ResetPassword/ResetPasswordForm'
import ProductSearch from './pages/SellProduct/ProductSearch';
import CategoryConfirmation from './pages/SellProduct/CategoryConfirmation'
import ProductDetails from './pages/SellProduct/ProductDetails';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import MyPublication from './pages/MyPublications/MyPublications'
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <AuthProvider>
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
            <Route path="/product/search" element={<ProductSearch />} />
            <Route path="/confirm-category/:categoryId" element={<CategoryConfirmation />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/my/publications" element={<MyPublication />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;