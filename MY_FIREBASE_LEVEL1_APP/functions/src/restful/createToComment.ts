import db from "../config/firestorm.config";
import createRestuflFunction, { MethodEnum } from "../utils/helpers";
import { createToCommentRequest } from "../todos/helpers/helpers";
import { ICreateToCommentRequest } from "../todos/models/models";

const createToComment = createRestuflFunction({
  method: MethodEnum.POST,
  callback: async (req, res) => {
    try {
      const body: ICreateToCommentRequest = req.body;

      const comment = createToCommentRequest({
        Title: body.Title,
        Description: body.Description,
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
