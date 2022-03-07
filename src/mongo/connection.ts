import { connect } from "mongoose";

export const MongoConnect = (connectionString: string) =>
  connect(connectionString);
