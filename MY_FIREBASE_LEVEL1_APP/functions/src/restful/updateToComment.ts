import db from "../config/firestorm.config";
import createRestuflFunction, { MethodEnum } from "../utils/helpers";

const updateToComment = createRestuflFunction({
  method: MethodEnum.PATCH,
  callback: async (req, res) => {
    try {
      const docId = req.params["0"];
      const Grade = req.body["Grade"];

      const query = db.collection("comments").doc(docId);
      await query.set({ Grade }, { merge: true });
      const snap = await query.get();

      res.status(200).json({
        message: "Comment updated",
        data: {
          id: docId,
          tocomment: snap.data(),
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

export default updateToComment;
