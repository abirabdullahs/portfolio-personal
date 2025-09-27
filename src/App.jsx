


import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-16 flex-1">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App
