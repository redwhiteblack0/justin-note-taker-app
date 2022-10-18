const express = require("express")
const path = require("path")
const fs = require("fs")
const {v4} = require("uuid")
const app = express()


app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "public/notes.html"))
})
// /notes is a route
app.get("/api/notes", (request, response) => {
    const data = fs.readFileSync(path.join(__dirname, "db/db.json"), {
        encoding: "utf8"
    })
    console.log(JSON.parse(data))
    response.json(JSON.parse(data))
})

app.post("/api/notes", (request, response) => {
    const body = request.body
    console.log(body)
    const data = fs.readFileSync(path.join(__dirname, "db/db.json"), {
        encoding: "utf8"
    })
    const parsedData = JSON.parse(data)
    const newNote = {
        ...body, 
        "id": v4()
    }
    parsedData.push(newNote)
    fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(parsedData))
    console.log(parsedData)
    response.json(newNote)
})


app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));

