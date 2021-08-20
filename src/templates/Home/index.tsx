import { Component } from "react";

import "./styles.scss";

import { loadPosts } from "./utils/load-posts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Posts } from "../../components/Posts-componentes/Posts";
import { Post } from "../../components/Posts-componentes/types";


export class Home extends Component<any> {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 5,
    searchValue: "",
  };
  async componentDidMount() {
    await this.loadPosts();
  }
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const photosAndPosts = await loadPosts();
    this.setState({
      posts: photosAndPosts.slice(page, postsPerPage),
      allPosts: photosAndPosts,
    });
  };
  loreMorePosts = () => {
    let { posts, allPosts, postsPerPage, page } = this.state;
    let nextPage = page + postsPerPage;
    let nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };
  render() {
    let { posts, allPosts, postsPerPage, page, searchValue } = this.state;
    let noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post: Post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <div className="search-container">
          <Input
            type={"search"}
            placeHolder = {"Search..."}
            event={this.handleChange}
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
              event={this.loreMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
