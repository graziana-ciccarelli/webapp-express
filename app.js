import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

import movieRouter from './routes/movieRouter.js';
import imagePathMiddleware from './middlewares/imagePath.js';


const corsOptions = {
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(express.static('public'));  
app.use(express.json());            
app.use(cors(corsOptions));        
app.use(imagePathMiddleware);


app.use('/movies', movieRouter);


app.listen(port, () => {
  console.log(`Server in funzione sulla porta: ${port}`);
});
