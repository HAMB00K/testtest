'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit3, Shield } from 'lucide-react';

export default function ProfilePage() {
  // Placeholder user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatarUrl: 'https://placehold.co/200x200.png',
    joinDate: '2023-05-15',
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account details and preferences.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-secondary/30">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name || 'User'} data-ai-hint="avatar person" />
            <AvatarFallback className="text-3xl"><User size={40}/></AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl font-semibold">{user.name || 'Anonymous User'}</CardTitle>
            <CardDescription className="text-md">{user.email || 'No email provided'}</CardDescription>
            <p className="text-sm text-muted-foreground mt-1">Joined on: {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          <Button variant="outline">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
            <Separator className="mb-4"/>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name || ''} className="mt-1"/>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email || ''} readOnly className="mt-1 bg-muted cursor-not-allowed"/>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Security Settings</h3>
            <Separator className="mb-4"/>
            <div className="space-y-4">
               <Button variant="outline" className="w-full md:w-auto">
                <Shield className="mr-2 h-4 w-4" /> Change Password
              </Button>
              {/* Future: Add 2FA settings, etc. */}
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
