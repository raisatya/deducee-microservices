import mongoose from "mongoose";

interface IInstituteAttrs {
  instituteId: string;
  instituteName: string;
  currentSession: string;
  sessions: mongoose.Types.Array<string>;
  classrooms: mongoose.Types.Array<string>;
}

interface IInstituteModel extends mongoose.Model<IInstituteDoc> {
    build(attrs: IInstituteAttrs): IInstituteDoc;
}

interface IInstituteDoc extends mongoose.Document {
  instituteId: string;
  instituteName: string;
  currentSession: string;
  sessions: mongoose.Types.Array<string>;
  classrooms: mongoose.Types.Array<string>;
}

const instituteSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    instituteName: {
      type: String,
      required: true,
    },
    currentSession: {
      type: String,
      required: true,
    },
    sessions: [String],
    classrooms: [String]
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

instituteSchema.statics.build = (attrs: IInstituteAttrs) => {
  return new Institute(attrs);
};

const Institute = mongoose.model<IInstituteDoc, IInstituteModel>('Institute', instituteSchema);

export {Institute};