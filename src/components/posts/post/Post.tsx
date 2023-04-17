import { MoreHoriz, ThumbUpAlt, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";
import { PostType } from "../../../types/PostType";
import useStyles from "./styles";

interface PostProps {
  post: any;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
}

const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        title={post.title}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          title="Update Post"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHoriz fontSize="inherit" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" component="h2" color="textSecondary">
          {post.tags.map((tag: string) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        variant="h5"
        component="h2"
        gutterBottom
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id) as any);
          }}
        >
          <ThumbUpAlt fontSize="small" /> Like {post.likeCount}{" "}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id) as any);
          }}
        >
          <Delete fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
