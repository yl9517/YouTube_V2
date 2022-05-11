import "dotenv/config";
import "module-alias/register";
import App from "@src/app";
import { logger } from "@/logger";

(async () => {
  await App.initMongoose();

  const app = App.initApp();

  app.listen(process.env.PORT || 7070, async () => {
    logger.info(`listen to port ${process.env.PORT || 6500}`);
  });
})();
