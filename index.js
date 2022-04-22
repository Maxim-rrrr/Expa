import Expa from './Expa/index.js'

import express from "express";
import mongoose from "mongoose";

const app = express();

app.use("/uploads", express.static("uploads"));
app.use("/file", express.static("file"));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = Expa.config.get("port") || 4000;

async function start() {
    try {

        await mongoose.connect(Expa.config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () =>
            Expa.logger.info(`Запуск сервера порт: ${PORT}`)
        );

    } catch (err) {
        console.log("Ошибка запуска сервера.", err.message);
        Expa.logger.error(`Ошибка запуска сервера. ${err.message}`);
        process.exit(1);
    }
}

start();