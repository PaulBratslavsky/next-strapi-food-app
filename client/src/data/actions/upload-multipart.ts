"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import { uploadImageService } from "@/data/services/upload-image-service";
import { createRecipeService } from "@/data/services/create-recipe-service";

// TODO: ADD MORE APPROPRIATE VALIDATION [ THIS IS JUST A BASIC E]
const FileSchema = z.object({
  name: z.string(),
  type: z.string().startsWith("image/"),
  size: z.number().max(5 * 1024 * 1024), // 5MB max size
});

const recipeSchema = z.object({
  label: z.string().min(1),
  serving: z.string().min(1),
  ingredients: z.string().min(1),
  instructions: z.string().min(1),
  category: z.string().min(1),
  image: FileSchema,
});

export async function uploadMultipart(formData: FormData) {
  const validatedFields = recipeSchema.safeParse({
    label: formData.get("label"),
    serving: formData.get("serving"),
    ingredients: formData.get("ingredients"),
    instructions: formData.get("instructions"),
    category: formData.get("category"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  try {
    const file = validatedFields.data.image;
    const fileBuffer = await (formData.get("image") as File).arrayBuffer();

    const uploadedImage = await uploadImageService(file as File, fileBuffer);

    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;

    const ingredientsObject = parseStringToObject(
      ingredients,
      "ingredients",
      "name"
    );

    const instructionsObject = parseStringToObject(
      instructions,
      "instructions",
      "step"
    );

    const payload = {
      data: {
        label: formData.get("label"),
        serving: formData.get("serving"),
        imageUrl: uploadedImage?.data[0].url,
        image: uploadedImage?.data[0].id,
        ...ingredientsObject,
        ...instructionsObject,
      },
    };

    const uploadedContent = await createRecipeService(payload);

    console.log("###########################");
    console.log(uploadedContent);
    console.log("###########################");

    revalidatePath("/");
    return {
      data: uploadedContent,
      zodErrors: null,
      strapiErrors: null,
      message: "Recipe Uploaded",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function parseStringToObject(items: string, key: string, field: string) {
  const ingredientsArray = items.split(",");
  const componentObject: Record<string, any> = {
    [key]: [],
  };

  const itemsArray = ingredientsArray.map((ingredient) => ({
    [field]: ingredient,
  }));

  componentObject[key] = itemsArray;
  return componentObject;
}
