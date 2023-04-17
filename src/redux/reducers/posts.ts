import { AnyAction } from "redux";

export default (posts = [], action: AnyAction) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "LIKE":
      return posts.map((post: any) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "UPDATE":
      return posts.map((post: any) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return posts.filter((post: any) => post._id !== action.payload);
    default:
      return posts;
  }
};
