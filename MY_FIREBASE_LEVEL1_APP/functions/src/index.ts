import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

//create comment
import createToComment from "./restful/createToComment";
export { createToComment };

//delete comment
import deleteToComment from "./restful/deleteToComment";
export { deleteToComment };

//update
import updateToComment from "./restful/updateToComment";
export { updateToComment };

//getAll
import getAllToComments from "./restful/getAllToComments";
export { getAllToComments };
