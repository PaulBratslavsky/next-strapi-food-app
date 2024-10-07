"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Home, Book, Bookmark, LogIn, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavigationProps {
  isLoggedIn: boolean;
}

export function Navigation({ isLoggedIn }: Readonly<NavigationProps>) {
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
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span>Welcome, User!</span>
            </div>
          ) : null}
          <Button
            variant="ghost"
            asChild
            className="w-full justify-start"
            onClick={() => {
              console.log("Home clicked");
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
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  console.log("Logout clicked");
                  handleLinkClick();
                }}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                console.log("Login clicked");
                handleLinkClick();
              }}
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}