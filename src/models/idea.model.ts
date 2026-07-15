import mongoose, { Document, Schema } from "mongoose";

// The original raw-MongoDB "ideas" collection accepted whatever shape the
// client sent (`insertOne(req.body)`), so beyond the fields the API actually
// reads/filters on, extra client-supplied fields are still allowed through
// (see `strict: false` below) to avoid silently dropping existing data.
export interface IIdea extends Document {
  title: string;
  tags: string[];
  author_id: string;
  [key: string]: unknown;
}

const ideaSchema = new Schema<IIdea>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    author_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
    versionKey: false, // keep response shape identical to the old raw-driver documents
  },
);

const IdeaModel = mongoose.model<IIdea>("ideas", ideaSchema);
export default IdeaModel;
