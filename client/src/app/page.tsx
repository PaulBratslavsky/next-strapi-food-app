"use client"

import { useState, useRef } from "react"

import { Plus, Search, Upload, Menu, Home, Book, Bookmark, LogIn, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Mock data for recipes
const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    author: "Jane Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Breakfast",
    likes: 128,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Dinner",
    likes: 256,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Green Smoothie",
    author: "Alice Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Drinks",
    likes: 64,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function RecipeApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: null as File | null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setNewRecipe((prev) => ({ ...prev, category: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewRecipe((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New Recipe:", newRecipe)
    setIsModalOpen(false)
    setNewRecipe({ title: "", category: "", ingredients: "", instructions: "", image: null })
    setImagePreview(null)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">RecipeShare</h1>
        <div className="flex items-center space-x-4">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Add Recipe</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Recipe</DialogTitle>
                <DialogDescription>
                  Fill in the details of your new recipe here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newRecipe.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select onValueChange={handleCategoryChange} value={newRecipe.category}>
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingredients" className="text-right">
                      Ingredients
                    </Label>
                    <Textarea
                      id="ingredients"
                      name="ingredients"
                      value={newRecipe.ingredients}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="instructions" className="text-right">
                      Instructions
                    </Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      value={newRecipe.instructions}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <div className="col-span-3">
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
                      {imagePreview && (
                        <div className="mt-2">
                          <img src={imagePreview} alt="Recipe preview" className="max-w-full h-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Recipe</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>Welcome, User!</span>
                  </div>
                ) : null}
                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Home clicked")}>
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Button>
                {isLoggedIn ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("My Recipes clicked")}>
                      <Book className="mr-2 h-5 w-5" />
                      My Recipes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Saved Recipes clicked")}>
                      <Bookmark className="mr-2 h-5 w-5" />
                      Saved Recipes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogin}>
                    <LogIn className="mr-2 h-5 w-5" />
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{recipe.category}</Badge>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={recipe.authorAvatar} />
                  <AvatarFallback>{recipe.author.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{recipe.author}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium">{recipe.likes} likes</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}