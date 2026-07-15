import mongoose, { Document, Schema, Types } from "mongoose";

// Same rationale as IdeaModel: the original raw-MongoDB "comment" collection
// accepted whatever shape the client sent, so `strict: false` keeps any
// extra client-supplied fields instead of silently dropping them.
export interface IComment extends Document {
  postID: Types.ObjectId;
  userID: Types.ObjectId;
  text: string;
  [key: string]: unknown;
}

const commentSchema = new Schema<IComment>(
  {
    postID: {
      type: Schema.Types.ObjectId,
      ref: "ideas",
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    strict: false,
    versionKey: false, // keep response shape identical to the old raw-driver documents
  },
);

const CommentModel = mongoose.model<IComment>("comment", commentSchema);
export default CommentModel;
