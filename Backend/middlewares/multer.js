import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 } // 1MB limit
}).single("file");