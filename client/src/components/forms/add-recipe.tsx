"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageInput } from "@/components/custom/image-input";
import { DynamicInputList } from "@/components/custom/dynamic-input-list";
import { DialogFooter } from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddRecipe() {
  return (
    <form action={() => {}} className="m-1">
      <div className="flex flex-col gap-6 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="title" className="text-left">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            defaultValue=""
            className="col-span-3"
          />
        </div>

        <ImageInput onChange={() => {}} />

        <div className="flex flex-col gap-4">
          <Label htmlFor="category" className="text-left">
            Category
          </Label>
          <Select defaultValue="breakfast" name="category">
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="ingredients" className="text-left pt-2">
            Ingredients
          </Label>
            <DynamicInputList name="ingredients" label="Ingredient" />
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="instructions" className="text-left pt-2">
            Instructions
          </Label>
          <DynamicInputList name="instructions" label="Step" />
        </div>
      </div>

      <DialogFooter className="sticky bottom-2">
        <Button type="submit">Save Recipe</Button>
      </DialogFooter>
    </form>
  );
}
