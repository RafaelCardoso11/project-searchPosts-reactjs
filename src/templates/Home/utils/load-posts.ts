import { Post } from "../../../components/Posts-componentes/types";

export const loadPosts = async () => {
  const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
  const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
  const postsJson = await posts.json();
  const photosJson = await photos.json();
  const photosAndPosts = await postsJson.map((post: Post, index: number) => {
    return { ...post, cover: photosJson[index].url };
  });
  return photosAndPosts;
}