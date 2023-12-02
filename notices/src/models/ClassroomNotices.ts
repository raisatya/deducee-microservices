import mongoose from "mongoose";

interface IClassroomNoticesAttrs {
  noticeTitle: string;
  noticeBody: string;
  instituteId: string;
  session: string;
  publishedBy: string;
  publisherId: string;
  role: string;
  designatedClassroom: string;
}

interface IClassroomNoticesModel extends mongoose.Model<IClassroomNoticesDoc> {
  build(attrs: IClassroomNoticesAttrs): IClassroomNoticesDoc;
}

interface IClassroomNoticesDoc extends mongoose.Document {
  noticeTitle: string;
  noticeBody: string;
  instituteId: string;
  session: string;
  publishedBy: string;
  publisherId: string;
  role: string;
  designatedClassroom: string;
}

const classroomNoticesSchema = new mongoose.Schema(
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
    designatedClassroom: {
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

classroomNoticesSchema.statics.build = (attrs: IClassroomNoticesAttrs) => {
  return new ClassroomNotices(attrs);
};

const ClassroomNotices = mongoose.model<IClassroomNoticesDoc, IClassroomNoticesModel>("ClassroomNotices", classroomNoticesSchema);

export { ClassroomNotices };
