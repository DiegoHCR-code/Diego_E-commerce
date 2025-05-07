import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import NewProduct from './pages/NewProduct/NewProduct';
function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <ErrorBoundary>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/new-product" element={<NewProduct />} />
              </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;