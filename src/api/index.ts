import axios from "axios";
import { PostType } from "../types/PostType";

const url = "http://localhost:3000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (post: PostType) => axios.post(url, post);
export const updatePost = (id: number, updatedPost: PostType) =>
  axios.put(`${url}/${id}`, updatedPost);

export const deletePost = (id: number) => axios.delete(`${url}/${id}`);
export const likePost = (id: number) => axios.patch(`${url}/${id}/likePost`);
