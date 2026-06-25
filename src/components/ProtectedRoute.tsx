import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClaimProfilePage from '../pages/ClaimProfilePage';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, profileLoading, needsClaim } = useAuth();

  if (loading || (session && profileLoading)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (needsClaim) {
    return <ClaimProfilePage />;
  }

  return <>{children}</>;
}
