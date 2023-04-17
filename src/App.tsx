import { AppBar, Container, Grid, Grow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import memories from "./images/memories.png";
import { getPosts } from "./redux/actions/posts";
import useStyles from "./styles";
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getPosts() as any);
  }, [dispatch]);
  console.log("id", currentId);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="Memories Image"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            alignItems="stretch"
            spacing={4}
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
