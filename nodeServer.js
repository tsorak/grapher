const express = require('express')
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, "public")))

console.log("Listening on http://localhost:3000")
app.listen(3000)
