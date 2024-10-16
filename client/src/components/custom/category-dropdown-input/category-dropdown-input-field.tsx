import { LayoutGridIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryDropdownProps {
  label: string;
  name: string;
  categories?: {
    name: string;
    slug: string;
    documentId: string;
  }[];
}

export function CategoryDropdownInputField({
  label,
  name,
  categories,

}: Readonly<CategoryDropdownProps>) {
  return (
    <Select name={name}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <LayoutGridIcon className="w-4 h-4" />
          <SelectValue placeholder={label} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category) => (
          <SelectItem key={category.slug} value={category.documentId}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


