import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to the DB");
  } catch (error) {
    log.error("error connecting to the database");
    process.exit(1);
  }
};

export default connect;
