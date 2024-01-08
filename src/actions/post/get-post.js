'use server'
import { getPostById } from "@/data/post"

export const getSinglePost = async (id) => {
  if (!id) return { error: 'Missing username!' }

  const post = await getPostById(id)
  
  if (!post) return { error: 'Post not Found' }

  return { post }
}

export const getManyPost = async () => {
  if (!id) return { error: 'Missing username!' }

  const post = await getPostById(id)
  
  if (!post) return { error: 'Post not Found' }

  return { post }
}