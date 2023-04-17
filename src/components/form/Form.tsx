import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { PostType } from "../../types/PostType";
import useStyles from "./styles";
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";

interface FormProps {
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
}

interface StateType {
  posts: PostType[];
}

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState<PostType>({
    creator: "",
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });
  const post = useSelector((state: StateType) =>
    currentId ? state.posts.find((p: any) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = (await convertToBase64(file)) as string;
    setPostData({ ...postData, selectedFile: base64 });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData) as any);
    } else {
      dispatch(createPost(postData) as any);
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [""],
      selectedFile: "",
    });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Update a Post" : "Create a Post"}
          </Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className={classes.fileInput}>
            <input
              type="file"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
