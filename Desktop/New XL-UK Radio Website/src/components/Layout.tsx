import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark relative">
      {/* Carbon Fiber Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "url('/images/carbon-background.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
          mixBlendMode: 'overlay'
        }}
      />
      
      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
