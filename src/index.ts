import dotenv from "dotenv";
import express from "express";
import { UserService } from "./services/UserService.js";
import { UserRepository } from "./repositories/UserRepository.js";


dotenv.config();
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
});


app.post("/create-user", async (req, res) => { 
    const { email, name, password } = req.body;
    const service = new UserService(new UserRepository());
    const result = await service.createUser({ email, name, password });
    res.send(result);
})

app.get("/user/:id", async (req, res) => { 
    const { id } = req.params;
    const service = new UserService(new UserRepository());
    const result = await service.getUserById(Number(id));
    res.send(result);
})



app.listen(process.env.PORT, () => {
    console.log("Server is running " + process.env.PORT);
});