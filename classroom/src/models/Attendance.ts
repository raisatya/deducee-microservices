import mongoose from "mongoose";

interface AttendanceData {
  attendanceTakenOn: string;
  attendanceTakenById: string;
  attendanceTakenByName: string;
  subjectName: string;
  subjectCode: string;
  isPresent: boolean;
}

interface IAttendanceAttrs {
  instituteId: string;
  session: string;
  classroomId: string;
  classroomName: string;
  studentName: string;
  rollNo: string;
  studentId: string;
  totalClasses: number;
  totalClassesAttended: number;
  detailedAttendanceArray: AttendanceData[];
}

interface IAttendanceModel extends mongoose.Model<IAttendanceDoc> {
  build(attrs: IAttendanceAttrs): IAttendanceDoc;
}

interface IAttendanceDoc extends mongoose.Document {
  instituteId: string;
  session: string;
  classroomId: string;
  classroomName: string;
  studentName: string;
  rollNo: string;
  studentId: string;
  totalClasses: number;
  totalClassesAttended: number;
  detailedAttendanceArray: AttendanceData[];
}

const attendanceSchema = new mongoose.Schema(
  {
    instituteId: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    classroomId: {
      type: String,
      required: true,
    },
    classroomName: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    totalClasses: {
      type: Number,
      required: true,
    },
    totalClassesAttended: {
      type: Number,
      required: true,
    },
    detailedAttendanceArray: [
      new mongoose.Schema<AttendanceData>({
        attendanceTakenOn: {
          type: String,
          required: true,
        },
        attendanceTakenById: {
          type: String,
          required: true,
        },
        attendanceTakenByName: {
          type: String,
          required: true,
        },
        subjectName: {
          type: String,
          required: true,
        },
        subjectCode: {
          type: String,
          required: true,
        },
        isPresent: {
          type: Boolean,
          required: true,
        },
      }),
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

attendanceSchema.statics.build = (attrs: IAttendanceAttrs) => {
  return new Attendance(attrs);
};

const Attendance = mongoose.model<IAttendanceDoc, IAttendanceModel>(
  "Attendance",
  attendanceSchema
);

export { Attendance };
