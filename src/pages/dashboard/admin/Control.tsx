
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Settings, AlertTriangle, Users, Briefcase, TrendingUp, Database, Mail } from 'lucide-react';

const AdminControl = () => {
  const [platformSettings, setPlatformSettings] = useState({
    allowNewRegistrations: true,
    requireEmailVerification: true,
    autoApproveJobs: false,
    enableNotifications: true,
    maintenanceMode: false
  });

  const [systemAlert, setSystemAlert] = useState('');

  const systemStats = {
    totalUsers: 1247,
    activeJobs: 89,
    pendingApprovals: 12,
    totalApplications: 456,
    weeklyGrowth: 8.5,
    systemUptime: '99.8%'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'User Registration',
      description: 'New teacher registered: John Smith',
      timestamp: '2024-01-30 14:30',
      severity: 'info'
    },
    {
      id: 2,
      type: 'Job Approval',
      description: 'Job post approved: Mathematics Teacher at Lincoln High',
      timestamp: '2024-01-30 13:45',
      severity: 'success'
    },
    {
      id: 3,
      type: 'System Alert',
      description: 'High number of failed login attempts detected',
      timestamp: '2024-01-30 12:15',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'Application',
      description: 'Job application submitted for Science Teacher position',
      timestamp: '2024-01-30 11:20',
      severity: 'info'
    }
  ];

  const handleSettingChange = (key: string, value: boolean) => {
    setPlatformSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSendSystemAlert = () => {
    console.log('Sending system alert:', systemAlert);
    setSystemAlert('');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Control Panel</h1>
        <p className="text-muted-foreground">Monitor platform integrity and manage system settings</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">{systemStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">{systemStats.activeJobs}</div>
                <p className="text-xs text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">{systemStats.pendingApprovals}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">{systemStats.totalApplications}</div>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">+{systemStats.weeklyGrowth}%</div>
                <p className="text-xs text-muted-foreground">Weekly Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-foreground">{systemStats.systemUptime}</div>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Platform Settings
            </CardTitle>
            <CardDescription>Control core platform functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRegistrations">Allow New Registrations</Label>
                  <p className="text-sm text-muted-foreground">Enable new user sign-ups</p>
                </div>
                <Switch
                  id="allowRegistrations"
                  checked={platformSettings.allowNewRegistrations}
                  onCheckedChange={(checked) => handleSettingChange('allowNewRegistrations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailVerification">Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Users must verify email before access</p>
                </div>
                <Switch
                  id="emailVerification"
                  checked={platformSettings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoApprove">Auto-approve Jobs</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve new job posts</p>
                </div>
                <Switch
                  id="autoApprove"
                  checked={platformSettings.autoApproveJobs}
                  onCheckedChange={(checked) => handleSettingChange('autoApproveJobs', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                </div>
                <Switch
                  id="notifications"
                  checked={platformSettings.enableNotifications}
                  onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              System Communications
            </CardTitle>
            <CardDescription>Send alerts and announcements to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemAlert">System Alert Message</Label>
              <Textarea
                id="systemAlert"
                placeholder="Enter system-wide alert message..."
                value={systemAlert}
                onChange={(e) => setSystemAlert(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={handleSendSystemAlert} disabled={!systemAlert.trim()}>
              <Mail className="w-4 h-4 mr-2" />
              Send Alert to All Users
            </Button>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Send Maintenance Notice
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Send Feature Update
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Send Security Notice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent System Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Monitor platform activity and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(activity.severity)}>{activity.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminControl;
