import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 } // 1MB limit
}).single("file");

export const multipleUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 } // 1MB limit
}).fields([
    { name: 'file', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]);