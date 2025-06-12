
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "../LanguageToggle";
import { useAppDispatch } from "@/app/hooks";
import { logOut, User as UserType } from "@/features/auth/authSlice";

interface MobileMenuProps {
  user: UserType | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: t("header.nav.home"), path: "/" },
    { label: t("header.nav.companyReviews"), path: "/company-reviews" },
    { label: t("header.nav.salaryGuide"), path: "/salary-guide" },
    { label: t("header.nav.careerGuide"), path: "/career-guide" },
  ];

  const getProfileMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'employee':
        return [
          { label: 'My Profile', path: '/dashboard/employee/profile' },
          { label: 'Skills & Experience', path: '/dashboard/employee/skills' },
          { label: 'Browse Jobs', path: '/dashboard/employee/browse-jobs' },
          { label: 'My Applications', path: '/dashboard/employee/applications' },
          { label: 'Settings', path: '/dashboard/employee/settings' },
        ];
      case 'college':
        return [
          { label: 'College Profile', path: '/dashboard/college/profile' },
          { label: 'Post New Job', path: '/dashboard/college/post-job' },
          { label: 'Manage Posts', path: '/dashboard/college/posts' },
          { label: 'Applications', path: '/dashboard/college/applications' },
          { label: 'Shortlist Candidates', path: '/dashboard/college/shortlist' },
          { label: 'Offer Letters', path: '/dashboard/college/offer-letter' },
          { label: 'Settings', path: '/dashboard/college/settings' },
        ];
      case 'admin':
        return [
          { label: 'Manage Jobs', path: '/dashboard/admin/jobs' },
          { label: 'User Management', path: '/dashboard/admin/users' },
          { label: 'Workflows', path: '/dashboard/admin/workflows' },
          { label: 'Control Panel', path: '/dashboard/admin/control-panel' },
          { label: 'Settings', path: '/dashboard/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const profileMenuItems = getProfileMenuItems();

  const handleLogout = () => {
    dispatch(logOut());
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {!user ? (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Logged in as: {user.email} ({user.role})
                </div>
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-destructive/10"
                >
                  {t("header.profile.signOut")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
