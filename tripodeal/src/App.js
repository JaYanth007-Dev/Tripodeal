
import { Outlet } from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Body from './Component/CommonComponents/Body';
import ContextProviderr from './Component/Context/ContextProvider';
import Footer from './Component/CommonComponents/Footer';
import Header2 from './Component/CommonComponents/Header2';
import PaymentPage from './Component/PaymentPage';
import ContactUs from './Component/Other Components/ContactUs';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Chart from './Chart';
import AccordionExample from './Chart';
import Json from './Json';
import Charts from './Chart';
const ScrollToTop = () => {
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, [pathname]);

  useEffect(() => {
    AOS.init();
  }, []);

  return null;
};


function App() {
  return (
    <ContextProviderr>
    <Header2/>
    <ScrollToTop/>
    <Outlet/>
    <Footer/>
    <ToastContainer />
    </ContextProviderr>
    // <div>
    // <ContactUs/>
    // <div>
    // <Charts/>
    // </div>
  
  );
}

export default App;
