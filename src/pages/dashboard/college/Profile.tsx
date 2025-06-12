
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Mail, Phone, MapPin, Globe, Users, Award, Building } from 'lucide-react';

const CollegeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    institutionName: 'Springfield University',
    email: 'hr@springfield.edu',
    phone: '+1 (555) 987-6543',
    address: '123 Education Lane, Springfield, IL 62701',
    website: 'www.springfield.edu',
    description: 'Springfield University is a premier educational institution committed to academic excellence and innovation in higher education.',
    established: '1885',
    accreditation: 'ACCREDITED',
    studentCount: '15,000+',
    facultyCount: '850+',
    departments: ['Mathematics', 'Science', 'English', 'History', 'Arts', 'Physical Education'],
    facilities: ['Library', 'Laboratories', 'Sports Complex', 'Auditorium', 'Cafeteria']
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving college profile:', profileData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">College Profile</h1>
          <p className="text-muted-foreground">Manage your institution's information and settings</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Institution Summary */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{profileData.institutionName}</h3>
              <Badge variant="secondary" className="mb-4">{profileData.accreditation}</Badge>
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.website}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Institution Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>Update your institution's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input
                    id="institutionName"
                    value={profileData.institutionName}
                    onChange={(e) => setProfileData({...profileData, institutionName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="established">Year Established</Label>
                  <Input
                    id="established"
                    value={profileData.established}
                    onChange={(e) => setProfileData({...profileData, established: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="description">Institution Description</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Institution Statistics</CardTitle>
              <CardDescription>Key numbers about your institution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{profileData.studentCount}</p>
                    <p className="text-sm text-muted-foreground">Students Enrolled</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{profileData.facultyCount}</p>
                    <p className="text-sm text-muted-foreground">Faculty Members</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader>
              <CardTitle>Departments & Facilities</CardTitle>
              <CardDescription>Academic departments and campus facilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Academic Departments</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.departments.map((dept, index) => (
                    <Badge key={index} variant="secondary">{dept}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Campus Facilities</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline">{facility}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;
