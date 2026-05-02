import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MarketingLayout from './pages/marketing/MarketingLayout';
import OverviewPage from './pages/marketing/OverviewPage';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<MarketingLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="instagram" element={<InstagramPage />} />
          <Route path="tiktok" element={<TikTokPage />} />
          <Route path="facebook" element={<FacebookPage />} />
          <Route path="linkedin" element={<LinkedInPage />} />
          <Route path="email" element={<EmailPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="brochure" element={<BrochurePage />} />
          <Route path="print-1" element={<Print1Page />} />
          <Route path="print-5" element={<Print5Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
