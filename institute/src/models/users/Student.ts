import mongoose from "mongoose";

interface IStudentAttrs {
  classroomId: string;
  classroomName: string;
  fullName: string;
  instituteId: string;
  rollNo: string;
  role: string;
  gender: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
}

interface IStudentModel extends mongoose.Model<IStudentDoc> {
  build(attrs: IStudentAttrs): IStudentDoc;
}

interface IStudentDoc extends mongoose.Document {
  classroomId: string;
  classroomName: string;
  fullName: string;
  instituteId: string;
  rollNo: string;
  role: string;
  gender: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
}

const studentSchema = new mongoose.Schema(
  {
    classroomId: {
      type: String,
      required: true,
    },
    classroomName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    instituteId: {
      type: String,
      required: true,
    },
    rollNo: {
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
    fatherName: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherContactNo: {
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

studentSchema.statics.build = (attrs: IStudentAttrs) => {
  return new Student(attrs);
};

const Student = mongoose.model<IStudentDoc, IStudentModel>(
  "Student",
  studentSchema
);

export { Student };
