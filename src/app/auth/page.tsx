'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/Logo';
import { User, LogIn, KeyRound, Mail, ArrowRight } from 'lucide-react'; 

// Placeholder for Google Icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
    <title>Google</title>
    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.254-3.138C18.189 1.186 15.479 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.76 0 11.729-4.764 11.729-11.986A11.284 11.284 0 0023.636 10.22l-.24-.035v.002H12.24z" fill="currentColor"></path>
  </svg>
);


export default function AuthenticationPage() {
  const router = useRouter();

  const handleAuthAction = () => {
    // In a real app, this would involve actual authentication logic
    // For now, we just navigate to the chat page
    router.push('/chat');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="mb-8 text-center">
        <Logo className="mx-auto mb-4" width={1000} height={1000} priority />
        <p className="text-muted-foreground">Sign in or create an account to continue</p>
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email-signin" type="email" placeholder="you@example.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password-signin" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleAuthAction}>
                <LogIn className="mr-2 h-5 w-5" /> Sign In
              </Button>
            </CardFooter>
          </TabsContent>
          <TabsContent value="signup">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Fill in the details to create your Securibot account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name-signup">Full Name</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name-signup" placeholder="Your Name" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email-signup" type="email" placeholder="you@example.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password-signup" type="password" placeholder="Create a strong password" className="pl-10" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAuthAction}>
                <User className="mr-2 h-5 w-5" /> Sign Up
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
        
        <div className="px-6 pb-6">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="w-full" onClick={handleAuthAction}>
              <GoogleIcon />
              <span className="ml-2">Sign in with Google</span>
            </Button>
            <Button variant="secondary" className="w-full group" onClick={handleAuthAction}>
              <User className="mr-2 h-5 w-5" />
              Continue as Guest
              <ArrowRight className="ml-auto h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already on Securibot?{' '}
        <Link href="/" className="underline hover:text-primary">
          Go back to Home
        </Link>
      </p>
    </div>
  );
}
