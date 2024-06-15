import dotenv from "dotenv";
import { createUserController } from "./server/adapter/createUserController.js";
import { App } from "./server/app.js";
import { createBookController } from "./server/adapter/createBookController.js";
import { createOrderController } from "./server/adapter/createOrderController.js";

dotenv.config();

const index = new App(
    createUserController(),
    createBookController(),
    createOrderController()
);

index.app.listen(process.env.PORT, () => {
    console.log("Server is running " + process.env.PORT);
});