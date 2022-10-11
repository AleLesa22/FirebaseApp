import db from "../config/firestorm.config";
import createRestuflFunction, { MethodEnum } from "../utils/helpers";
import { createToCommentRequest } from "../todos/helpers/helpers";
import { ICreateToCommentRequest } from "../todos/models/models";

const createToComment = createRestuflFunction({
  method: MethodEnum.POST,
  callback: async (req, res) => {
    try {
      const body: ICreateToCommentRequest = req.body;

      let stringSplit = body.Description;
      let splitted = stringSplit.split(" ");
      let arrayOfWordsToCensor = new Array();

      for (const element of splitted) {
        arrayOfWordsToCensor.push(element);
      }

      let NewComment: string = "";
      let myChecker: string[] = ["one", "two", "three", "four"];

      for (let i = 0; i < arrayOfWordsToCensor.length; i++) {
        let temp = arrayOfWordsToCensor[i];
        for (const element of myChecker) {
          if (arrayOfWordsToCensor[i] === element) {
            temp = "*".repeat(element.length);
            break;
          }
        }
        if (i === arrayOfWordsToCensor.length - 1) {
          NewComment += temp;
        } else {
          NewComment += temp + " ";
        }
      }

      const comment = createToCommentRequest({
        Title: body.Title,
        Description: NewComment,
        User: body.User,
        Grade: body.Grade,
      });

      const ref = await db.collection("comments").add(comment);
      const doc = await ref.get();

      res.status(200).json({
        message: "Comment created",
        data: {
          id: doc.id,
          tocomment: doc.data(),
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
        err,
      });
    }
  },
});

export default createToComment;
