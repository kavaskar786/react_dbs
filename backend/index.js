import express from "express"
import mysql from "mysql2"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"2132",
    database:"test"
})

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.use(express.json())

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been added suncessfully")
    })
})



app.listen(8800,()=>
console.log("connected to the backend!123"))