const express =require("express")
const PORT = 1212
const db = require("./config/userDB")
const router = require("./routes/userRouter")

const app = express()
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/api",router)

app.listen(PORT, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${PORT}`);
})