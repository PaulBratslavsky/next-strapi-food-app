"use client";

import { FC, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  pageCount: number;
  className?: string;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({ direction, href, isDisabled }) => {
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 pointer-events-none" : "";

  return (
    <PaginationLink
      href={href}
      className={cn(disabledClassName)}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      aria-label={isLeft ? "Go to previous page" : "Go to next page"}
    >
      {isLeft ? "«" : "»"}
    </PaginationLink>
  );
};

export function Pagination({ pageCount, className }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = useMemo(() => {
    return (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      // Preserve the search query if it exists
      const query = searchParams.get("query");
      if (query) {
        params.set("query", query);
      }
      return `${pathname}?${params.toString()}`;
    };
  }, [pathname, searchParams]);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink href={createPageURL(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i)} isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < pageCount - 2) {
        pages.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      pages.push(
        <PaginationItem key={pageCount}>
          <PaginationLink href={createPageURL(pageCount)} isActive={currentPage === pageCount}>
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <PaginationComponent className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}