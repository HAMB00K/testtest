"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/Logo';
import {
  BotMessageSquare,
  FileText,
  History,
  LayoutDashboard,
  MessageSquarePlus,
  Settings,
  UserCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import React from 'react';

const mockChatHistory: { id: string; title: string }[] = [
  { id: '1', title: 'Phishing Attack Vectors' },
  { id: '2', title: 'Ransomware Protection Tips' },
  { id: '3', title: 'Securing Home Network' },
  { id: '4', title: 'Zero-Trust Architecture' },
  { id: '5', title: 'Password Best Practices' },
  { id: '6', title: 'Understanding Malware Types' },
  { id: '7', title: 'Cloud Security Basics' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openHistory, setOpenHistory] = React.useState(true);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" className="border-r">
        <SidebarHeader className="p-4 items-center flex gap-2">
          <Logo className="text-primary" size={32}/>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h2 className="font-headline text-xl font-semibold text-primary">Securibot</h2>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-0">
          <ScrollArea className="h-full">
            <SidebarGroup className="p-2 pt-0">
               <SidebarMenu>
                <SidebarMenuItem>
                  <Button variant="ghost" className="w-full justify-start h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:p-0">
                     <MessageSquarePlus className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden ml-2">New Chat</span>
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator className="my-1"/>

            <SidebarGroup className="p-2">
              <SidebarMenuButton 
                onClick={() => setOpenHistory(!openHistory)}
                className="w-full mb-1 group-data-[collapsible=icon]:justify-center"
                size="sm"
              >
                <History className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:hidden ml-2">Chat History</span>
                {openHistory ? <ChevronDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" /> : <ChevronRight className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />}
              </SidebarMenuButton>
              {openHistory && (
                 <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                  {mockChatHistory.map((chat) => (
                    <SidebarMenuSubItem key={chat.id}>
                      <SidebarMenuSubButton
                        href={`/chat?session=${chat.id}`} // Example, not functional yet
                        isActive={pathname === `/chat` && (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('session') === chat.id)}
                        className="truncate"
                        size="sm"
                      >
                        <FileText className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {chat.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t">
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/profile'}
                tooltip={{ children: 'Profile', side: 'right', className: 'bg-primary text-primary-foreground' }}
              >
                <Link href="/profile">
                  <UserCircle /> <span className="group-data-[collapsible=icon]:hidden">Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === '/settings'}
                tooltip={{ children: 'Settings', side: 'right', className: 'bg-primary text-primary-foreground' }}
              >
                <Link href="/settings">
                  <Settings /> <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{ children: 'Logout', side: 'right', className: 'bg-destructive text-destructive-foreground' }}
              >
                <Link href="/auth"> {/* Simulate logout by going to auth page */}
                  <LogOut className="text-destructive" /> <span className="group-data-[collapsible=icon]:hidden text-destructive">Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
           <div className="flex items-center gap-2 mt-4 p-2 rounded-lg bg-secondary group-data-[collapsible=icon]:hidden">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="avatar person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">User Name</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="p-4 border-b md:hidden sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="text-primary" size={28}/>
              <h1 className="font-headline text-lg font-semibold text-primary">Securibot</h1>
            </div>
            <SidebarTrigger />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
