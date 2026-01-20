import express from 'express';
import cookieParser  from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from  "./routes/application.route.js";
dotenv.config({}); 
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions));

//api's
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute)


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})