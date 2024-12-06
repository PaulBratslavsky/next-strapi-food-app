"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Book, Bookmark, LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Types
interface User {
  id: number;
  documentId: string;
  email: string;
  username: string;
}

interface NavigationProps {
  isLoggedIn: boolean;
  logoutButton: React.ReactNode;
  user: User;
}

export function Navigation({
  isLoggedIn,
  logoutButton,
  user,
}: Readonly<NavigationProps>) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 mb-6">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>Welcome, {user.username}!</span>
            </div>
          ) : null}
          <Button
            variant="ghost"
            asChild
            className="w-full justify-start"
            onClick={() => {
              handleLinkClick();
            }}
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
          </Button>
          {isLoggedIn ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLinkClick}
              >
                <Link href="/my-recipes">
                  <Book className="mr-2 h-5 w-5" />
                  My Recipes
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLinkClick}
              >
                <Link href="/saved-recipes">
                  <Bookmark className="mr-2 h-5 w-5" />
                  Saved Recipes
                </Link>
              </Button>
              <button onClick={handleLinkClick} className="logout-button">
                <span>{logoutButton}</span>
              </button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
              onClick={handleLinkClick}
            >
              <Link href="/signin">
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
