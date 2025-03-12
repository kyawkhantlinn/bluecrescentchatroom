import express from "express";

// => Express server set up

const exapp = express();

exapp.use(express.static("dist")); // Server static files from the public folder

// Start the express server

exapp.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
});

