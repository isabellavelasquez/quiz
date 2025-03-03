import express, { json } from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import questionRoutes from "./routes/questionRoutes.mjs"

dotenv.config();
const port = process.env.PORT

const app = express()

app.use(cors())
app.use(json());

app.use("/quiz", questionRoutes)

app.get("/ping",(_, res) => {
    res.status(200).json({status: "Alive"})
})

app.listen(3000, async(error) => {
    try {
        await mongoose.connect("mongodb+srv://isabella:Qwertyuiop98@schoolcluster.honxl.mongodb.net/?retryWrites=true&w=majority&appName=SchoolCluster")
        console.log(`Server is running on port: ${port}, connected to database`)
    } catch (error) {
        console.error(error)
    }
})