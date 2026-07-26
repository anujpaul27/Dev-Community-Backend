import app from "./src/app";
import ConnectDB from "./src/config/connect.db";
import config from "./src/config/config";

const start = async () => {
  await ConnectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on ${config.PORT}`);
  });
};

start();
