


import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className=" ">
        <AppRoutes />
      </div>
    
    </div>
  );
}

export default App
