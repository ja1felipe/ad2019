import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo conectado com sucesso.');
  });

app.use(cors());
app.use(express.json());

app.use(routes);

export default app;
