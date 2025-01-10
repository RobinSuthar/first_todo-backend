import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASELINK = process.env.DATABASE_URL;
console.log(DATABASELINK);
mongoose.connect(DATABASELINK);

const databaseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: Boolean,
  },
  {
    timestamps: true,
  }
);

const DataBaseSchema = mongoose.model("FullStackToDo", databaseSchema);

export default DataBaseSchema;
