import { ICreateToCommentRequest, IToComment } from "../models/models";

export const createToCommentRequest = (
  tocomment: ICreateToCommentRequest
): IToComment => {
  return { ...tocomment, date: Date.now().toString() };
};
