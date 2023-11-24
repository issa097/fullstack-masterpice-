// // const multer = require("multer");
// // const path = require("path");

// // // Set up Multer to handle file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/"); // Specify the upload directory
// //   },
// //   filename: (req, file, cb) => {
// //     const filename = Date.now() + path.extname(file.originalname);
// //     cb(null, filename);
// //   },
// // });

// // const upload = multer({ storage: storage });

// // module.exports = { upload };

const multer = require("multer");
const path = require("path");
const express = require("express");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const admin = require("firebase-admin");
const serviceAccount = require("./image-64e47-firebase-adminsdk-bx52j-900713965b.json");
// const db = require("../lib/db");

const app = express();
app.use(express.static("public"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://image-64e47.appspot.com",
});

async function getImageDownloadUrl(imageName) {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(imageName);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2025",
    });
    return url;
  } catch (error) {
    console.error("Error getting image download URL:", error);
    throw error;
  }
}

function uploadImg(req, res, next) {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading image:", err);
        res.status(500).send("Error uploading image.");
      } else {
        const bucket = admin.storage().bucket();

        const imageBuffer = req.file.buffer;
        const imageName = req.file.originalname;
        const file = bucket.file(imageName);
        const fileType = req.file.mimetype;
        const result = await file.save(imageBuffer, { contentType: fileType });
        console.log("Image uploaded successfully:");
        const Name = imageName;
        getImageDownloadUrl(Name)
          .then((url) => {
            res.locals.site = url;
            console.log("Download URL:", res.locals.site);
            next();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image.");
  }
}

async function updateImage(req, res, next) {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading image:", err);
        res.status(500).send("Error uploading image.");
      } else {
        const bucket = admin.storage().bucket();
        const imageBuffer = req.file.buffer;
        const imageName = req.file.originalname;
        const file = bucket.file(imageName);
        const fileType = req.file.mimetype;

        // إنشاء ملف للكتابة
        const fileStream = file.createWriteStream({
          metadata: {
            contentType: fileType,
          },
        });

        // كتابة البيانات إلى الملف
        fileStream.end(imageBuffer);

        // الانتظار حتى يتم الانتهاء من كتابة البيانات
        await new Promise((resolve, reject) => {
          fileStream.on("finish", resolve);
          fileStream.on("error", reject);
        });

        console.log("Image updated successfully");

        const updatedName = imageName;
        getImageDownloadUrl(updatedName)
          .then((url) => {
            res.locals.site = url;
            console.log("Download URL:", res.locals.site);
            next();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).send("Error updating image.");
  }
}

module.exports = {
  uploadImg,
  admin,
  updateImage,
};
