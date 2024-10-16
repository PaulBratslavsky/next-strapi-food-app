"use client";
import { useState, useRef, ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageInput } from "@/components/custom/image-input";
import { DynamicInputList } from "@/components/custom/dynamic-input-list";
import { DialogFooter } from "@/components/ui/dialog";
import { uploadMultipart } from "@/data/actions/upload-multipart";

export function AddRecipe({ categories }: { categories: ReactNode }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resetImage, setResetImage] = useState(false);

  const resetForm = () => {
    setSelectedFile(null);
    setResetImage(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (formData: FormData) => {
    if (selectedFile) formData.set("image", selectedFile);

    const result = await uploadMultipart(formData);
    resetForm();
  };

  const handleReset = () => {
    resetForm();
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setResetImage(false);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-6 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="label" className="text-left">
            Dish Name
          </Label>
          <Input
            id="label"
            type="text"
            name="label"
            defaultValue=""
            className="col-span-3"
          />
        </div>

        <div className="flex flex-col gap-4">{categories}</div>

        <ImageInput onFileChange={handleFileChange} reset={resetImage} />

        <Input
          type="number"
          id="serving"
          name="serving"
          defaultValue="1"
          min={1}
          className="col-span-3"
        />

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
        <div className="flex space-x-2">
          <SubmitButton />
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload"}
    </Button>
  );
}
