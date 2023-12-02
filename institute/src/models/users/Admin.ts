import mongoose from "mongoose";

interface IAdminAttrs {
  fullName: string;
  instituteId: string;
  role: string;
  gender: string;
  designation: string;
  qualifications: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  emailId: string;
}

interface IAdminModel extends mongoose.Model<IAdminDoc> {
  build(attrs: IAdminAttrs): IAdminDoc;
}

interface IAdminDoc extends mongoose.Document {
  fullName: string;
  instituteId: string;
  role: string;
  gender: string;
  designation: string;
  qualifications: string;
  dateOfBirth: string;
  joinedOn: string;
  contactNo: string;
  emailId: string;
}

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    instituteId: {
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

adminSchema.statics.build = (attrs: IAdminAttrs) => {
  return new Admin(attrs);
};

const Admin = mongoose.model<IAdminDoc, IAdminModel>("Admin", adminSchema);

export { Admin };
