import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from 'lucide-react';

interface DynamicInputListProps {
  name: string;
  label: string;
}

export function DynamicInputList({ name, label }: Readonly<DynamicInputListProps>) {
  const [items, setItems] = useState<string[]>(['']);

  const addItem = () => {
    setItems([...items, '']);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={`${label} ${index + 1}`}
            className="flex-grow mr-2"
            name={`${name}[${index}]`}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addItem}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}