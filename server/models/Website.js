import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WebsiteSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  linkKey:{
    type: String,
  },
  DOMString:{
    type: String,
  }
});

const Website = mongoose.model("website", WebsiteSchema);

export default Website;