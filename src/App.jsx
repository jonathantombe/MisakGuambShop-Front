import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;