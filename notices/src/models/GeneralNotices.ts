import mongoose from "mongoose";

interface IGeneralNoticesAttrs {
  noticeTitle: string;
  noticeBody: string;
  instituteId: string;
  session: string;
  publishedBy: string;
  publisherId: string;
  role: string;
}

interface IGeneralNoticesModel extends mongoose.Model<IGeneralNoticesDoc> {
  build(attrs: IGeneralNoticesAttrs): IGeneralNoticesDoc;
}

interface IGeneralNoticesDoc extends mongoose.Document {
  noticeTitle: string;
  noticeBody: string;
  instituteId: string;
  session: string;
  publishedBy: string;
  publisherId: string;
  role: string;
}

const generalNoticesSchema = new mongoose.Schema(
  {
    noticeTitle: {
      type: String,
      required: true,
    },
    noticeBody: {
      type: String,
      required: true,
    },
    instituteId: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    publishedBy: {
      type: String,
      required: true,
    },
    publisherId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

generalNoticesSchema.statics.build = (attrs: IGeneralNoticesAttrs) => {
  return new GeneralNotices(attrs);
};

const GeneralNotices = mongoose.model<IGeneralNoticesDoc, IGeneralNoticesModel>(
  "GeneralNotices",
  generalNoticesSchema
);

export { GeneralNotices };
