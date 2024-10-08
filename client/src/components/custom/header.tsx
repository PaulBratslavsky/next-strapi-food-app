import { Navigation } from "@/components/custom/navigation";
import { Modal } from "@/components/custom/modal";
import { AddRecipe } from "@/components/forms/add-recipe";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold">RecipeShare</h1>
      <div className="flex items-center space-x-4">
        <Modal
          isLoggedIn={true}
          heading="Add New Recipe"
          description="Fill in the details of your new recipe here. Click save when you're done."
          button={
            <Button>
              <Plus className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Add Recipe</span>
            </Button>
          }
        >
          <AddRecipe />
        </Modal>
        <Navigation isLoggedIn={true} />
      </div>
    </header>
  );
}
