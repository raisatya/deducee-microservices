import mongoose from "mongoose";

interface ExamMarks {
  subjectName: string;
  subjectCode: string;
  fullMarks: number;
  passMarks: number;
  marksObtained: number;
  remarks: string;
  examDate: string;
  examTime: string;
}

interface IExamStatsAttrs {
  instituteId: string;
  session: string;
  classroomId: string;
  examId: string;
  examinationName: string;
  studentName: string;
  rollNo: string;
  studentId: string;
  grandTotal: number;
  totalMarksObtained: number;
  subjectReports: ExamMarks[];
}

interface IExamStatsModel extends mongoose.Model<IExamStatsDoc> {
  build(attrs: IExamStatsAttrs): IExamStatsDoc;
}

interface IExamStatsDoc extends mongoose.Document {
  instituteId: string;
  session: string;
  classroomId: string;
  examId: string;
  examinationName: string;
  studentName: string;
  rollNo: string;
  studentId: string;
  grandTotal: number;
  totalMarksObtained: number;
  subjectReports: ExamMarks[];
}

const ExamStatsSchema = new mongoose.Schema(
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
    examId: {
      type: String,
      required: true,
    },
    examinationName: {
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
    grandTotal: {
      type: Number,
      required: true,
    },
    totalMarksObtained: {
      type: Number,
      required: true,
    },
    subjectReports: [
      new mongoose.Schema<ExamMarks>({
        subjectName: {
          type: String,
          required: true,
        },
        subjectCode: {
          type: String,
          required: true,
        },
        fullMarks: {
          type: Number,
          required: true,
        },
        passMarks: {
          type: Number,
          required: true,
        },
        marksObtained: {
          type: Number,
          required: true,
        },
        remarks: {
          type: String,
          required: true,
        },
        examDate: {
          type: String,
          required: true,
        },
        examTime: {
          type: String,
          required: true,
        },
      }),
    ],
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

ExamStatsSchema.statics.build = (attrs: IExamStatsAttrs) => {
  return new ExamStats(attrs);
};

const ExamStats = mongoose.model<IExamStatsDoc, IExamStatsModel>(
  "ExamStats",
  ExamStatsSchema
);

export { ExamStats };
