import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// const studentCollection = "students";

const studentSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  gender: String,
  courses: {
    type: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "courses",
        },
      },
    ],
  },
});

studentSchema.pre("find", function () {
  this.populate("courses.course");
});

studentSchema.plugin(mongoosePaginate);

const studentModel = mongoose.model("students", studentSchema);
export default studentModel;
