import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import CommissionStructurePage from './pages/CommissionStructurePage';
import MarketingLayout from './pages/marketing/MarketingLayout';
import OverviewPage from './pages/marketing/OverviewPage';
import PipelinePage from './pages/marketing/PipelinePage';
import DealPage from './pages/marketing/DealPage';
import InboundPage from './pages/marketing/InboundPage';
import TeamPage from './pages/marketing/TeamPage';
import CommissionPage from './pages/marketing/CommissionPage';
import InstagramPage from './pages/marketing/InstagramPage';
import TikTokPage from './pages/marketing/TikTokPage';
import FacebookPage from './pages/marketing/FacebookPage';
import LinkedInPage from './pages/marketing/LinkedInPage';
import EmailPage from './pages/marketing/EmailPage';
import SalesPage from './pages/marketing/SalesPage';
import BrandPage from './pages/marketing/BrandPage';
import BrochurePage from './pages/marketing/BrochurePage';
import Print1Page from './pages/marketing/Print1Page';
import Print5Page from './pages/marketing/Print5Page';
import EnquiriesPage from './pages/marketing/EnquiriesPage';
import DiaryPage from './pages/marketing/DiaryPage';
import { BookingProvider } from './context/BookingContext';
import BookingModal from './components/BookingModal';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <BookingModal />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Public-facing shareable pages */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/demo" element={<LandingPage />} />
            <Route path="/brochure" element={<BrochurePage standalone />} />
            <Route path="/one-pager" element={<Print1Page standalone />} />
            <Route path="/sales-pack" element={<Print5Page standalone />} />
            <Route path="/view/brochure" element={<BrochurePage standalone />} />
            <Route path="/view/1-pager" element={<Print1Page standalone />} />
            <Route path="/view/5-pager" element={<Print5Page standalone />} />
            <Route path="/commission-structure" element={<CommissionStructurePage />} />

            {/* Internal pipeline — requires login */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MarketingLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OverviewPage />} />
              <Route path="pipeline" element={<PipelinePage />} />
              <Route path="deals/:id" element={<DealPage />} />
              <Route path="inbound" element={<InboundPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="commission" element={<CommissionPage />} />
              <Route path="enquiries" element={<EnquiriesPage />} />
              <Route path="diary" element={<DiaryPage />} />
              <Route path="instagram" element={<InstagramPage />} />
              <Route path="tiktok" element={<TikTokPage />} />
              <Route path="facebook" element={<FacebookPage />} />
              <Route path="linkedin" element={<LinkedInPage />} />
              <Route path="email" element={<EmailPage />} />
              <Route path="sales" element={<SalesPage />} />
              <Route path="brand" element={<BrandPage />} />
              <Route path="brochure-tool" element={<BrochurePage />} />
              <Route path="print-1" element={<Print1Page />} />
              <Route path="print-5" element={<Print5Page />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
