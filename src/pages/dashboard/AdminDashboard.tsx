
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { Shield, Briefcase, Users, BarChart3, Monitor, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard/admin/jobs', label: 'Manage Jobs', icon: Briefcase },
    { path: '/dashboard/admin/users', label: 'User Management', icon: Users },
    { path: '/dashboard/admin/workflow', label: 'Workflows', icon: BarChart3 },
    { path: '/dashboard/admin/control', label: 'Control Panel', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-page">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-background border-r border-border">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Admin Dashboard</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                <Link to="/">
                  <Home className="w-4 h-4 mr-3" />
                  Back to Home
                </Link>
              </Button>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="w-full justify-start"
                >
                  <Link to={item.path}>
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
