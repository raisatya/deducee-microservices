import mongoose from "mongoose";

interface INoticesClassroomListAttrs {
  instituteId: string;
  session: string;
  classrooms: mongoose.Types.Array<string>;
}

interface INoticesClassroomListModel
  extends mongoose.Model<INoticesClassroomListDoc> {
  build(attrs: INoticesClassroomListAttrs): INoticesClassroomListDoc;
}

interface INoticesClassroomListDoc extends mongoose.Document {
  instituteId: string;
  session: string;
  classrooms: mongoose.Types.Array<string>;
}

const noticesClassroomListSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    classrooms: [String],
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

noticesClassroomListSchema.statics.build = (
  attrs: INoticesClassroomListAttrs
) => {
  return new NoticesClassroomList(attrs);
};

const NoticesClassroomList = mongoose.model<
  INoticesClassroomListDoc,
  INoticesClassroomListModel
>("NoticesClassroomList", noticesClassroomListSchema);

export { NoticesClassroomList };
