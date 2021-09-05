import {  useCallback, useEffect, useState } from "react";

import "./styles.scss";

import { loadPosts } from "./utils/load-posts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Posts } from "../../components/Posts-componentes/Posts";
import { Post } from "../../components/Posts-componentes/types";


export const Home =()=>{
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([])
  const [postsPerPage] = useState(5);
  const [page, setPage]= useState(0);
  const [searchValue, setSearchValue] = useState('');

  let noMorePosts = page + postsPerPage >= allPosts.length;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const photosAndPosts = await loadPosts();
    setPosts(photosAndPosts.slice(page, postsPerPage));
    setAllPosts(photosAndPosts)
  }, []);

  const loreMorePosts = () => {
    let nextPage = page + postsPerPage;
    let nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts)
    setPage(nextPage)
  };
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value)
  };

  const filteredPosts = !!searchValue
    ? allPosts.filter((post: Post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  useEffect(()=>{
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage])
  
  return(
      <section className="container">
        <div className="search-container">
          <Input
            type={"search"}
            placeHolder = {"Search..."}
            event={handleChange}
            value={searchValue}
          />
        </div>
        <div className="posts-container">
          {filteredPosts.length > 0 ? (
            <Posts posts={filteredPosts} />
          ) : (
            <p className="notPostsText"> Não existe nenhum post com esse nome.</p>
          )}
        </div>
        <div className="button-Container">
          {!searchValue && (
            <Button
              text={"Load more Posts"}
              event={loreMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
  )
}
