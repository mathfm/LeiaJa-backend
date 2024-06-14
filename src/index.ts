import dotenv from "dotenv";
import { createUserController } from "./server/adapter/createUserController.js";
import { App } from "./server/app.js";
import { createBookController } from "./server/adapter/createBookController.js";


dotenv.config();
// export const app = express();
// app.use(express.json());
// const userController = createUserController();

const index = new App(
    createUserController(),
    createBookController()
);

index.app.listen(process.env.PORT, () => {
    console.log("Server is running " + process.env.PORT);
});

// app.post("/user/create", async (req, res) => userController.createUser(req, res));

// app.get("/user/:id", async (req, res) => userController.getUserById(req, res));

// app.put("/user/:id/update", async (req, res) => userController.updateUser(req, res));

// app.delete("/user/:id/delete", async (req, res) => userController.deleteUser(req, res));



// app.listen(process.env.PORT, () => {
//     console.log("Server is running " + process.env.PORT);
// });