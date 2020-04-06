import axios from 'axios';
import { useState, useEffect } from 'react';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.response.use(
  (res) => res.data,
  (err: any) => Promise.reject(err)
);

interface IPost {
  _id: string;
  title: string;
  body: string;
  votes: number;
  tags: string[];
  createdAt: number,
  updatedAt: number
}

export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const setIntialData = () => {
    (async () => {
      await getPosts();
    })();
  }

  const getPosts: any = async () => {
    try {
      const posts: IPost[] = await API.get('');
      console.log('posts: ', posts);
      setPosts(posts);
    } catch (error) {
      return error;
    }
  }

  const updatePost: any = async (id: string, post: any) => {
    const unselectedPosts = posts.filter(post => post._id !== id);

    try {
      const updatedPost: IPost = await API.put(`/${id}`, post);
      setPosts([...unselectedPosts, updatedPost]);
    } catch (error) {
      return error;
    }
  }

  const deletePost: any = async (id: string) => {
    const unselectedPosts = posts.filter(post => post._id !== id);

    try {
      await API.delete(`/${id}`);
      setPosts([...unselectedPosts]);
    } catch (error) {
      return error;
    }
  }

  const createPost: any = async (id: string, post: any) => {
    try {
      const createdPost: IPost = await API.post('/', post);
      setPosts([...post, createdPost]);
    } catch (error) {
      return error;
    }
  }

  const updateVote: any = (id: string, type: string) => {
    const unselectedPosts = posts.filter(post => post._id !== id);
    const foundPost: any = posts.find(post => post._id === id);

    const upvote = async() => {
      const votes = foundPost.votes + 1;
      const updatedPost: IPost = await API.put(`/${id}`, { votes });
      const posts = [...unselectedPosts, updatedPost];
      setPosts(posts);
      return posts;
    }

    const downvote = async() => {
      const votes = foundPost.votes - 1;
      const updatedPost: IPost = await API.put(`/${id}`, { votes });
      const posts = [...unselectedPosts, updatedPost];
      setPosts(posts);
      return posts;
    }

    switch (type) {
      case 'upvote':
        return upvote();
      case 'downvote':
        return downvote();
      default:
        return posts;
    }
  }

  useEffect(setIntialData, []);

  return {
    posts,
    updatePost,
    updateVote,
    createPost,
    getPosts,
    deletePost
  };
}
