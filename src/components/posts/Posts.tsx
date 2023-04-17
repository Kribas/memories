import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PostType } from "../../types/PostType";
import Post from "./post/Post";
import useStyles from "./styles";

interface PostsPropType {
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
}
interface StateType {
  posts: PostType[];
}

const Posts: React.FC<PostsPropType> = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state: StateType) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: any) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
