import express, { json } from "express"
import cors from "cors"
import mongoose, { Error } from "mongoose"
import dotenv from "dotenv"
import questionRoutes from "./routes/questionRoutes.mjs"

dotenv.config();
const port = process.env.PORT || 3000
const dbUrl = process.env.MONGO_URL

if(!dbUrl) throw new Error("no MONGO_URL in env file")

const app = express()

app.use(cors())
app.use(json());

app.use("/question", questionRoutes)

app.get("/ping",(_, res) => {
    res.status(200).json({status: "Alive"})
})

app.listen(3000, async(error) => {
    try {
        await mongoose.connect(dbUrl)
        console.log(`Server is running on port: ${port}, connected to database`)
    } catch (error) {
        console.error(error)
    }
})