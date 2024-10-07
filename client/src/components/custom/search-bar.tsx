"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

// Custom hook for debouncing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [term, setTerm] = useState(searchParams.get("query")?.toString() ?? "");

  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    setTerm(searchParams.get("query")?.toString() ?? "");
  }, [pathname]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    // Remove this line to preserve the current page
    // params.set("page", "1");

    if (debouncedTerm) {
      params.set("query", debouncedTerm);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedTerm, searchParams, replace, pathname]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 rounded-full w-full"
          onChange={(e) => setTerm(e.target.value)}
          defaultValue={term || ""}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
