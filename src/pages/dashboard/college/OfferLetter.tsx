
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Send, FileText, Check, Clock, User } from 'lucide-react';

const CollegeOfferLetter = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [offerDetails, setOfferDetails] = useState({
    salary: '',
    startDate: '',
    benefits: '',
    terms: '',
    additionalNotes: ''
  });

  const hiredCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      jobTitle: 'High School Mathematics Teacher',
      email: 'sarah.johnson@email.com',
      hiredDate: '2024-01-25',
      offerStatus: 'Pending',
      salaryOffered: '$65,000'
    },
    {
      id: 2,
      name: 'Michael Chen',
      jobTitle: 'High School Mathematics Teacher',
      email: 'michael.chen@email.com',
      hiredDate: '2024-01-28',
      offerStatus: 'Sent',
      salaryOffered: '$60,000'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      jobTitle: 'Elementary Science Teacher',
      email: 'emily.rodriguez@email.com',
      hiredDate: '2024-01-30',
      offerStatus: 'Accepted',
      salaryOffered: '$55,000'
    }
  ];

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateOffer = () => {
    console.log('Creating offer for candidate:', selectedCandidate, 'with details:', offerDetails);
  };

  const handleSendOffer = (candidateId: number) => {
    console.log('Sending offer to candidate:', candidateId);
  };

  const handleUploadOffer = () => {
    console.log('Uploading offer letter document');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
        <p className="text-muted-foreground">Create and manage offer letters for hired candidates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Offer Creation Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Offer Letter</CardTitle>
              <CardDescription>Generate an offer letter for a selected candidate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="candidate">Select Candidate</Label>
                <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a hired candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {hiredCandidates.filter(c => c.offerStatus === 'Pending').map(candidate => (
                      <SelectItem key={candidate.id} value={candidate.id.toString()}>
                        {candidate.name} - {candidate.jobTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input
                    id="salary"
                    placeholder="e.g., $65,000"
                    value={offerDetails.salary}
                    onChange={(e) => setOfferDetails({...offerDetails, salary: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={offerDetails.startDate}
                    onChange={(e) => setOfferDetails({...offerDetails, startDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="benefits">Benefits Package</Label>
                <Textarea
                  id="benefits"
                  placeholder="Describe the benefits package (health insurance, retirement, PTO, etc.)"
                  value={offerDetails.benefits}
                  onChange={(e) => setOfferDetails({...offerDetails, benefits: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="terms">Terms and Conditions</Label>
                <Textarea
                  id="terms"
                  placeholder="Employment terms, probation period, contract duration, etc."
                  value={offerDetails.terms}
                  onChange={(e) => setOfferDetails({...offerDetails, terms: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional information or special conditions"
                  value={offerDetails.additionalNotes}
                  onChange={(e) => setOfferDetails({...offerDetails, additionalNotes: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreateOffer} disabled={!selectedCandidate}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Offer Letter
                </Button>
                <Button variant="outline" onClick={handleUploadOffer}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Custom Letter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Status Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offer Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Offers</span>
                  <span className="font-semibold">{hiredCandidates.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {hiredCandidates.filter(c => c.offerStatus === 'Pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sent</span>
                  <span className="font-semibold text-blue-600">
                    {hiredCandidates.filter(c => c.offerStatus === 'Sent').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accepted</span>
                  <span className="font-semibold text-green-600">
                    {hiredCandidates.filter(c => c.offerStatus === 'Accepted').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Templates
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hired Candidates List */}
      <Card>
        <CardHeader>
          <CardTitle>Hired Candidates</CardTitle>
          <CardDescription>Manage offer letters for all hired candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hiredCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground">{candidate.jobTitle}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Hired: {new Date(candidate.hiredDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        Salary: {candidate.salaryOffered}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getOfferStatusColor(candidate.offerStatus)}>
                    {candidate.offerStatus}
                  </Badge>
                  
                  {candidate.offerStatus === 'Pending' && (
                    <Button size="sm" onClick={() => handleSendOffer(candidate.id)}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Offer
                    </Button>
                  )}
                  
                  {candidate.offerStatus === 'Sent' && (
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-2" />
                      Awaiting Response
                    </Button>
                  )}
                  
                  {candidate.offerStatus === 'Accepted' && (
                    <Button variant="outline" size="sm">
                      <Check className="w-4 h-4 mr-2" />
                      Offer Accepted
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeOfferLetter;
