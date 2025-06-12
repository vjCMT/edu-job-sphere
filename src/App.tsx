
// App.tsx
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetMeQuery } from './features/auth/authApiService';
import {
  logOut,
  selectIsAuthenticated,
  selectCurrentUser,
  setCredentials,
} from './features/auth/authSlice';
import i18n from './i18n/config';

import Login from './components/Login';
import Signup from './components/Signup';
import CareerGuide from './pages/CareerGuide';
import CompanyReviews from './pages/CompanyReviews';
import FindCV from './pages/FindCV';
import Help from './pages/Help';
import Index from './pages/Index';
import JobDetailPage from './pages/Jobfulldetailspage';
import Messages from './pages/Messages';
import MyJobs from './pages/MyJobs';
import MyProfile from './pages/MyProfile';
import MyReviews from './pages/MyReviews';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import PostJob from './pages/PostJob';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import SalaryDetailsPage from './pages/SalaryDetailsPage';
import SalaryGuide from './pages/SalaryGuide';
import SettingsPage from './pages/SettingsPage/SettingsPage';

// Dashboard Components
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import CollegeDashboard from './pages/dashboard/CollegeDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Employee Dashboard Pages
import EmployeeProfile from './pages/dashboard/employee/Profile';
import EmployeeSkills from './pages/dashboard/employee/Skills';
import EmployeeJobs from './pages/dashboard/employee/Jobs';
import EmployeeApply from './pages/dashboard/employee/Apply';
import EmployeeApplications from './pages/dashboard/employee/Applications';
import EmployeeSettings from './pages/dashboard/employee/Settings';

// College Dashboard Pages
import CollegePostJob from './pages/dashboard/college/PostJob';
import CollegeProfile from './pages/dashboard/college/Profile';
import CollegePosts from './pages/dashboard/college/Posts';
import CollegeApplications from './pages/dashboard/college/Applications';
import CollegeShortlist from './pages/dashboard/college/Shortlist';
import CollegeOfferLetter from './pages/dashboard/college/OfferLetter';

// Admin Dashboard Pages
import AdminJobs from './pages/dashboard/admin/Jobs';
import AdminUsers from './pages/dashboard/admin/Users';
import AdminWorkflow from './pages/dashboard/admin/Workflow';
import AdminControl from './pages/dashboard/admin/Control';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};

const AppContent = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data, isSuccess, isError, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch().catch(() => {
        dispatch(logOut());
      });
    }
  }, [isAuthenticated, refetch, dispatch]);

  useEffect(() => {
    if (isSuccess && data?.success) {
      dispatch(setCredentials({ user: data.data }));
    } else if (isError) {
      dispatch(logOut());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading && isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/company-reviews" element={<CompanyReviews />} />
        <Route path="/salary-guide" element={<SalaryGuide />} />
        <Route path="/career-guide" element={<CareerGuide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/career/:careerPath/salaries" element={<SalaryDetailsPage />} />
        <Route path="/findcv" element={<FindCV />} />
        <Route path="/resources" element={<Resources />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/products" element={<Products />} />
        </Route>

        {/* Employee Dashboard Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/dashboard/employee" element={<EmployeeDashboard />}>
            <Route index element={<Navigate to="/dashboard/employee/profile" replace />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="skills" element={<EmployeeSkills />} />
            <Route path="jobs" element={<EmployeeJobs />} />
            <Route path="apply" element={<EmployeeApply />} />
            <Route path="applications" element={<EmployeeApplications />} />
            <Route path="settings" element={<EmployeeSettings />} />
          </Route>
        </Route>

        {/* College Dashboard Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['college']} />}>
          <Route path="/dashboard/college" element={<CollegeDashboard />}>
            <Route index element={<Navigate to="/dashboard/college/profile" replace />} />
            <Route path="post-job" element={<CollegePostJob />} />
            <Route path="profile" element={<CollegeProfile />} />
            <Route path="posts" element={<CollegePosts />} />
            <Route path="applications" element={<CollegeApplications />} />
            <Route path="shortlist" element={<CollegeShortlist />} />
            <Route path="offer-letter" element={<CollegeOfferLetter />} />
          </Route>
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="/dashboard/admin/jobs" replace />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="workflow" element={<AdminWorkflow />} />
            <Route path="control" element={<AdminControl />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppContent />
      <Toaster position="top-right" />
    </I18nextProvider>
  );
};

export default App;
