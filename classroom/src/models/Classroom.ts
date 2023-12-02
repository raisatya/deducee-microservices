import mongoose from "mongoose";

interface Student {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  rollNo: string;
  gender: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
}

interface Subject {
  subjectCode: string;
  subjectName: string;
  assignedTeacherName: string;
  assignedTeacherId: string;
}

interface IClassroomAttrs {
  instituteId: string;
  session: string;
  classroomName: string;
  students: Student[];
  subjects: Subject[];
}

interface IClassroomModel extends mongoose.Model<IClassroomDoc> {
  build(attrs: IClassroomAttrs): IClassroomDoc;
}

interface IClassroomDoc extends mongoose.Document {
  instituteId: string;
  session: string;
  classroomName: string;
  students: Student[];
  subjects: Subject[];
  disabled: boolean;
}

const classroomSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    classroomName: {
      type: String,
      required: true,
    },
    students: [
      new mongoose.Schema<Student>({
        fullName: {
          type: String,
          required: true,
        },
        rollNo: {
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
      }),
    ],
    subjects: [
      new mongoose.Schema<Subject>({
        subjectName: {
          type: String,
          required: true,
        },
        subjectCode: {
          type: String,
          required: true,
        },
        assignedTeacherName: {
          type: String,
          required: true,
        },
        assignedTeacherId: {
          type: String,
          required: true,
        },
      }),
    ],
    disabled: {
      type: Boolean,
      default: false,
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

classroomSchema.statics.build = (attrs: IClassroomAttrs) => {
  return new Classroom(attrs);
};

const Classroom = mongoose.model<IClassroomDoc, IClassroomModel>(
  "Classroom",
  classroomSchema
);

export { Classroom };