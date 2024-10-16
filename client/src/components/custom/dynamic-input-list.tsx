import React, { useState, useCallback } from 'react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from 'lucide-react';

interface DynamicInputListProps {
  name: string;
  label: string;
  maxItems?: number;
}

export function DynamicInputList({ name, label, maxItems = 25 }: Readonly<DynamicInputListProps>) {
  const [items, setItems] = useState<string[]>(['']);

  const addItem = useCallback(() => {
    setItems(prevItems => [...prevItems, '']);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, []);

  const updateItem = useCallback((index: number, value: string) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = value;
      return newItems;
    });
  }, []);

  const isLastItemEmpty = items[items.length - 1].trim() === '';
  const canAddMore = items.length < maxItems && !isLastItemEmpty;

  return (
    <div role="group" aria-labelledby={`${name}-label`}>
      <div id={`${name}-label`} className="sr-only">{label}</div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={`${label} ${index + 1}`}
            className="flex-grow mr-2"
            name={`${name}[${index}]`}
            aria-label={`${label} ${index + 1}`}
          />
          {items.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${label} ${index + 1}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <input 
        type="hidden" 
        name={name} 
        value={items.filter(item => item.trim() !== '').join(",")} 
      />
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addItem}
          className="rounded-full"
          disabled={!canAddMore}
          aria-label={`Add ${label}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
