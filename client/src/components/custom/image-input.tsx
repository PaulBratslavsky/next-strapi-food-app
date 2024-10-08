import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

interface ImageInputProps {
  onChange: (file: File) => void;
  initialImagePreview?: string;
}

export function ImageInput({
  onChange,
  initialImagePreview,
}: Readonly<ImageInputProps>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImagePreview ?? null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        {imagePreview && (
          <div className="mb-2 rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full h-auto"
            />
          </div>
        )}
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Image
        </Button>
      </div>
    </div>
  );
}
