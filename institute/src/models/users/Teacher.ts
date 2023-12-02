import mongoose from "mongoose";

/*
interface ITeacherAttrs {
  instituteId: string;
  fullName: string;
  authorizedClassrooms: mongoose.Types.Array<string>;
}
*/

interface ITeacherAttrs {
  instituteId: string;
  fullName: string;
  role: string;
  gender: string;
  designation: string;
  qualifications: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  emailId: string;
}

interface ITeacherModel extends mongoose.Model<ITeacherDoc> {
  build(attrs: ITeacherAttrs): ITeacherDoc;
}

interface ITeacherDoc extends mongoose.Document {
  instituteId: string;
  fullName: string;
  role: string;
  gender: string;
  designation: string;
  qualifications: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  emailId: string;
}

const teacherSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    joinedOn: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    }
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

teacherSchema.statics.build = (attrs: ITeacherAttrs) => {
  return new Teacher(attrs);
};

const Teacher = mongoose.model<ITeacherDoc, ITeacherModel>(
  "Teacher",
  teacherSchema
);

export { Teacher };
