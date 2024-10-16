import Link from "next/link";

import { Navigation } from "@/components/custom/navigation";
import { Modal } from "@/components/custom/modal";
import { AddRecipe } from "@/components/forms/add-recipe";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { getUserMeLoader } from "@/lib/services/user";
import { LogoutButtonWrapper } from "./logout-button-wrapper";
import { ShowPath } from "@/components/custom/show-path";
import { CategoryDropdownInput } from "@/components/custom/category-dropdown-input";

export async function Header() {
  const userData = await getUserMeLoader();
  const isLoggedIn = userData.ok;

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-2xl md:text-3xl font-bold">
          RecipeShare
        </Link>
        <ShowPath />
      </div>
      <div className="flex items-center space-x-4">
        <Modal
          isLoggedIn={isLoggedIn}
          heading="Add New Recipe"
          description="Fill in the details of your new recipe here. Click save when you're done."
          button={
            <Button>
              <Plus className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Add Recipe</span>
            </Button>
          }
        >
          <AddRecipe categories={<CategoryDropdownInput />} />
        </Modal>
        <Navigation
          isLoggedIn={isLoggedIn}
          user={userData.data}
          logoutButton={
            <LogoutButtonWrapper>
              <Button
                variant="ghost"
                className="w-full justify-start"
                type="submit"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </LogoutButtonWrapper>
          }
        />
      </div>
    </header>
  );
}
