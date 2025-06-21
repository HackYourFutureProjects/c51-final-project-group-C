import multer from "multer";

// 👇 This is to temporarily store the uploaded files in RAM

const storage = multer.memoryStorage();

// 👇 Check if the uploaded file is an image

const fileFilter = (req, file, acceptFile) => {
  if (file.mimetype.startsWith("image/")) {
    // 👇 null here means no errors, true is to accept the file
    acceptFile(null, true);
  } else {
    acceptFile(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 👈 10mb limit for image
    files: 3, // 👈 Max 3 files in one request
  },
});

// 👇 Error handling middleware for multer

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size is 5MB." });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res
        .status(400)
        .json({ message: "Too many files. Maximum is 3 files." });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// 👇 This is to allow multer to accept multiple files (not relevent for profilePhotto and tripCover, but needed for activityPhotos)

export const uploadFiles = upload.array("images");
