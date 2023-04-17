import { Dispatch } from "redux";
import * as api from "../../api";
import { PostType } from "../../types/PostType";

export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post: PostType) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost =
  (id: number, post: PostType) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost = (id: number) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id: number) => async (dispatch: Dispatch) => {
  try {
    await api.likePost(id);
    dispatch({ type: "LIKE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
