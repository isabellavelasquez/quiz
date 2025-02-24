import express from "express"

const app = express()

app.get("/ping",(_, res) => {
    res.status(200).json({status: "Alive"})
})

app.listen(3000, (error) => {
    if(error) {
        console.error(error)
    } else {
        console.log("Api is running on port 3000")
    }
});