import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { ToastContainer } from "react-toastify";
import axios from "@/utils/axios";
import "react-toastify/dist/ReactToastify.css";
import Index from "./pages/Index";

import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { Dashboard } from "./pages/Dashboard";
// import PropertySearch from "./pages/PropertySearch";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddProperty";
import BookVisit from "./pages/BookVisit";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import TermsConditions from "./pages/TermsConditions";
import RequestInfo from "./pages/RequestInfo";
import Feedback from "./pages/Feedback";
import ReportProblem from "./pages/ReportProblem";
import Testimonials from "./pages/Testimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SummonsNotices from "./pages/SummonsNotices";
import Grievances from "./pages/Grievances";
// import SafetyGuide from "./pages/SafetyGuide";
// import MobileApps from "./pages/MobileApps";
import OurServices from "./pages/OurServices";
import PriceTrends from "./pages/PriceTrends";
import PostProperty from "./pages/PostProperty";
import RealEstateInvestments from "./pages/RealEstateInvestments";
import BuildersIndia from "./pages/BuildersIndia";
import AreaConverter from "./pages/AreaConverter";
// import Articles from "./pages/Articles";
import RentReceipt from "./pages/RentReceipt";
import CustomerService from "./pages/CustomerService";
// import Sitemap from "./pages/Sitemap";
import AgentProfile from "./pages/AgentProfile";
import EMICalculator from "./pages/EMICalculator";
import PropertyValuation from "./pages/PropertyValuation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import { Index2 } from "./pages/Index2";
import Dashboard from "./pages/Dashboard";
import PropertySearch from "./pages/PropertySearch";
import OTPModal from "./pages/OTPModal";
import EmailVerify from "./pages/EmailVerify";





const queryClient = new QueryClient();

const App = () => {
  const [isLoggeIn, setisLoggedIn] = useState(false);
  const [isregister,setisregister]=useState(false)

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  // Check login status on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setisLoggedIn(true);
      setisregister(true);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />        <BrowserRouter>
        <ScrollToTop />
        <SearchProvider>
          <Header isLoggeIn={isLoggeIn} setisLoggedIn={setisLoggedIn} isregister={isregister} setisregister={setisregister} />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/login"
              element={<Login setisLoggeIn={setisLoggedIn} setisregister={setisregister} />}
            />
            <Route
              path="/register"
              element={<Register setisLoggeIn={setisLoggedIn} setisregister={setisregister} />}
            />
            
            <Route path="/dashboard" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <Dashboard />
              </ProtectedRoute>
            }/>
            <Route path="/search" element={<Index2/>} />
            <Route path="/property-search" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <PropertySearch onFilterChange={() => {}} />
              </ProtectedRoute>
            } />

            <Route path="index" element={<Index/>} />
            <Route path="/property/:slug" element={<PropertyDetail />} />

            <Route path="/add-property" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <AddProperty />
              </ProtectedRoute>
            } />
            <Route path="/book-visit" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <BookVisit />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={<ProtectedRoute  isLoggedIn={isLoggeIn}>
              <Profile />
            </ProtectedRoute>} />
            <Route path="/admin" element={
              <ProtectedRoute isLoggedIn={isLoggeIn} allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/agent" element={
              <ProtectedRoute isLoggedIn={isLoggeIn} allowedRoles={['agent']}>
                <AgentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/owner" element={
              <ProtectedRoute isLoggedIn={isLoggeIn} allowedRoles={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/request-info" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <RequestInfo />
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <Feedback />
              </ProtectedRoute>
            } />
            <Route path="/report-problem" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <ReportProblem />
              </ProtectedRoute>
            } />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/summons-notices" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <SummonsNotices />
              </ProtectedRoute>
            } />
            <Route path="/grievances" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <Grievances />
              </ProtectedRoute>
            } />
            {/* <Route path="/safety-guide" element={<SafetyGuide />} /> */}
            {/* <Route path="/mobile-apps" element={<MobileApps />} /> */}
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/price-trends" element={<PriceTrends />} />
            <Route path="/post-property" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <PostProperty />
              </ProtectedRoute>
            } />
            <Route
              path="/real-estate-investments"
              element={<RealEstateInvestments />}
            />
            <Route path="/builders-in-india" element={<BuildersIndia />} />
            <Route path="/area-converter" element={<AreaConverter />} />
            {/* <Route path="/articles" element={<Articles />} /> */}
            <Route path="/rent-receipt" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <RentReceipt />
              </ProtectedRoute>
            } />
            <Route path="/customer-service" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <CustomerService />
              </ProtectedRoute>
            } />
            {/* <Route path="/sitemap" element={<Sitemap />} /> */}
            <Route path="/agent/:agentId" element={<AgentProfile />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/property-valuation" element={
              <ProtectedRoute isLoggedIn={isLoggeIn}>
                <PropertyValuation />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />

            {/* for verification */}
            <Route path="otpmodal" element={<OTPModal phone={undefined} onClose={undefined} onSuccess={undefined}/>}/>
            <Route path="/verify-email/:slug" element={<EmailVerify/>}/>
          </Routes>
          <Footer />
          </SearchProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
