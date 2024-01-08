'use server'
import { getUserByUsername } from '@/data/user'

export const userProfile = async (username) => {
  if (!username) return { error: 'Missing username!' }

  const existingUser = await getUserByUsername(username)

  if (!existingUser) return { error: 'User not Found' }

  const user = {
    id: existingUser.id,
    name: existingUser.name,
    bio: existingUser.bio,
    username: existingUser.username,
    siteLink: existingUser.siteLink,
    image: existingUser.image,
    email: existingUser.email,
    posts: existingUser.posts,
    following: existingUser.followingIDs,
    followers: existingUser.followedByIDs,
  }

  let posts = {};

  if (user.posts.length > 0) {
    posts = user.posts;
  } else {
    posts = { noPost: "No Posts Yet" };  
  }

  return { user, posts }
}
