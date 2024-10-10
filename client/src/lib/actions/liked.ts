'use server'

import { revalidatePath } from 'next/cache'
import { getUserMeLoader } from '@/lib/services/user'
import { redirect } from 'next/navigation'

export async function toggleLike(prevState: { likes: number; isLiked: boolean }, id: string) {
  const user = await getUserMeLoader();
  const userId = user?.data?.documentId;
  if (!userId) redirect("/signin");
  console.log("toggleLike", id);
  // Here you would typically update the like status in your database
  // For this example, we'll just simulate the update
  const newLikes = prevState.isLiked ? prevState.likes - 1 : prevState.likes + 1
  const newIsLiked = !prevState.isLiked

  // Revalidate the current path to reflect the changes
  revalidatePath('/')

  return { likes: newLikes, isLiked: newIsLiked }
}