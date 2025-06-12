
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Star,
  Search,
  FileText,
  Settings as SettingsIcon,
  GraduationCap,
  PlusCircle,
  ClipboardList,
  UserCheck,
  FileCheck,
  Briefcase,
  Users,
  BarChart3,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks";
import { logOut, User as UserType } from "@/features/auth/authSlice";

interface ProfileDropdownProps {
  user: UserType;
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getProfileMenuItems = () => {
    switch (user.role) {
      case 'employee':
        return [
          { label: 'My Profile', path: '/dashboard/employee/profile', icon: User },
          { label: 'Skills & Experience', path: '/dashboard/employee/skills', icon: Star },
          { label: 'Browse Jobs', path: '/dashboard/employee/browse-jobs', icon: Search },
          { label: 'My Applications', path: '/dashboard/employee/applications', icon: FileText },
          { label: 'Settings', path: '/dashboard/employee/settings', icon: SettingsIcon },
        ];
      case 'college':
        return [
          { label: 'College Profile', path: '/dashboard/college/profile', icon: GraduationCap },
          { label: 'Post New Job', path: '/dashboard/college/post-job', icon: PlusCircle },
          { label: 'Manage Posts', path: '/dashboard/college/posts', icon: ClipboardList },
          { label: 'Applications', path: '/dashboard/college/applications', icon: FileText },
          { label: 'Shortlist Candidates', path: '/dashboard/college/shortlist', icon: UserCheck },
          { label: 'Offer Letters', path: '/dashboard/college/offer-letter', icon: FileCheck },
          { label: 'Settings', path: '/dashboard/college/settings', icon: SettingsIcon },
        ];
      case 'admin':
        return [
          { label: 'Manage Jobs', path: '/dashboard/admin/jobs', icon: Briefcase },
          { label: 'User Management', path: '/dashboard/admin/users', icon: Users },
          { label: 'Workflows', path: '/dashboard/admin/workflows', icon: BarChart3 },
          { label: 'Control Panel', path: '/dashboard/admin/control-panel', icon: Monitor },
          { label: 'Settings', path: '/dashboard/admin/settings', icon: SettingsIcon },
        ];
      default:
        return [];
    }
  };

  const profileMenuItems = getProfileMenuItems();

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
      >
        <User className="h-5 w-5 text-muted-foreground" />
      </Button>
      {isProfileMenuOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-background rounded-md shadow-lg z-50 border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-bold text-foreground truncate">
              {user.email}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user.role === 'employee' ? 'Teacher/Job Seeker' : 
               user.role === 'college' ? 'College/Institution' : 
               'Administrator'}
            </p>
          </div>
          <div className="py-1">
            {profileMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="border-t border-border">
            <div className="px-4 py-3 text-xs text-muted-foreground">
              © 2025 TeacherConnect -{" "}
              <a href="#" className="underline">
                Terms
              </a>{" "}
              -{" "}
              <a href="#" className="underline">
                Accessibility
              </a>
            </div>
          </div>
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              {t("header.profile.signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
