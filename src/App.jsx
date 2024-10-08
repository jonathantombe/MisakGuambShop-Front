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
import HeroMisakWelcome from '../src/components/HeroMisakWelcome/HeroMisakWelcome';
import History from '../src/pages/History/History';
import ProductSearch from './pages/SellProduct/ProductSearch';
import CategoryConfirmation from './pages/SellProduct/CategoryConfirmation'
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
            <Route path="/register/seller" element={<SellerRegister />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/product/search" element={<ProductSearch />} />
            <Route path="/confirm-category/:categoryId" element={<CategoryConfirmation />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/" exact component={HeroMisakWelcome} />
            <Route path="/history" component={History} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;