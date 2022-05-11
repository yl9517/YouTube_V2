import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { logger } from "@/logger";
import indexRoutes from "@/src/routes/index";

const initMiddelware = (app: express.Application): void => {
  app.use(express.json());
};

export default {
  initApp(): express.Application {
    const app = express();

    initMiddelware(app);
    app.use(indexRoutes);
    return app;
  },

  async initMongoose(): Promise<void> {
    const mongoCluster: string = process.env.MONGO_CLUSTER as string;
    let mongoDbname: string = process.env.MONGO_DBNAME || "test";
    let mongoUser: string = process.env.MONGO_USER as string;
    let mongoPassword: string = process.env.MONGO_PASSWORD as string;

    try {
      const mongoUri = mongoCluster
        .replace("<username>", mongoUser)
        .replace("<password>", mongoPassword)
        .replace("<dbname>", mongoDbname);

      await mongoose.connect(mongoUri);
      logger.info(`Mongo DB Connected : ${mongoUri}`);
    } catch (e) {
      logger.error(e);
    }
  },
};
