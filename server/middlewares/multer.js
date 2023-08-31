import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //where to store the file
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file if it's not a jpg or png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000024 * 1000000024 * 50000000,
  },
  fileFilter: fileFilter,
});


