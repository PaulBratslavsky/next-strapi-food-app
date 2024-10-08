"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  isLoggedIn: boolean;
  heading: string;
  description?: string;
  children: React.ReactNode;
  button: React.ReactNode;
}

export function Modal({ isLoggedIn, heading, description, children, button }: Readonly<ModalProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-[90vw] max-h-[80vh] flex flex-col m-0">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          {description && <DialogDescription>
            {description}
          </DialogDescription>}
        </DialogHeader>
        <ScrollArea className="h-[80vh] p-6">
          {children || <div>No children provided</div>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
