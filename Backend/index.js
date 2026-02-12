import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from "./routes/application.route.js";
import path from 'path';
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://jobportal-1-wx8o.onrender.com',
    credentials: true,
}

app.use(cors(corsOptions));

//api's
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoute);
app.use('/api/application', applicationRoute)

app.use(express.static(path.join(__dirname, 'frontend/dist')));

// This catch-all middleware handles all SPA routes and avoids path-to-regexp errors
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'File size is too large. Max limit is 1MB.',
            success: false
        });
    }
    return res.status(500).json({
        message: err.message || 'Internal server error',
        success: false
    });
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})