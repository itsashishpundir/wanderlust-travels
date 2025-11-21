import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { PackageListing } from './pages/PackageListing';
import { PackageDetails } from './pages/PackageDetails';
import { TaxiBooking } from './pages/TaxiBooking';
import { HotelListing } from './pages/HotelListing';
import { AdminPanel } from './pages/AdminPanel';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { BookingSummary } from './pages/BookingSummary';
import { Support } from './pages/Support';

// Layout wrapper to conditionally render Navbar/Footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  // Hide navbar/footer for login/signup for cleaner look
  const isAuthRoute = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && !isAuthRoute && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/packages" element={<PackageListing />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          
          <Route path="/taxi" element={<TaxiBooking />} />
          <Route path="/hotels" element={<HotelListing />} />
          
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/summary" element={<BookingSummary />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          <Route path="/support" element={<Support />} />
          
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;