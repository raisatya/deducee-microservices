import mongoose from "mongoose";

interface ExamSubjects {
  subjectName: string;
  subjectCode: string;
  fullMarks: number;
  passMarks: number;
  examDate: string;
  examTime: string;
}

interface IExamDataAttrs {
  instituteId: string;
  session: string;
  classroomId: string;
  examinationName: string;
  grandTotal: number;
  createdById: string;
  createdByName: string;
  examinationSubjects: ExamSubjects[];
}

interface IExamDataModel extends mongoose.Model<IExamDataDoc> {
  build(attrs: IExamDataAttrs): IExamDataDoc;
}

interface IExamDataDoc extends mongoose.Document {
  instituteId: string;
  session: string;
  classroomId: string;
  examinationName: string;
  grandTotal: number;
  createdById: string;
  createdByName: string;
  examinationSubjects: ExamSubjects[];
}

const examDataSchema = new mongoose.Schema(
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
    examinationName: {
      type: String,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    createdById: {
      type: String,
      required: true,
    },
    createdByName: {
      type: String,
      required: true,
    },
    examinationSubjects: [
      new mongoose.Schema<ExamSubjects>({
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

examDataSchema.statics.build = (attrs: IExamDataAttrs) => {
  return new ExamData(attrs);
};

const ExamData = mongoose.model<IExamDataDoc, IExamDataModel>(
  "ExamData",
  examDataSchema
);

export { ExamData };
