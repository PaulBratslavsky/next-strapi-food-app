import { Navigation } from "@/components/custom/navigation";
import { Modal } from "@/components/custom/modal";
export function Header() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold">RecipeShare</h1>
      <div className="flex items-center space-x-4">
        <Navigation isLoggedIn={true} />
        <Modal isLoggedIn={true} />
      </div>
    </header>
  );
}
