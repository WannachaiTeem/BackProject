import express from "express";
import multer from "multer";
import {  ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {storage} from "./firebasecon"


export const router = express.Router();


class FileMiddleware {
  filename = "";
  public readonly memoryLoader = multer({
    storage: multer.memoryStorage(), // ใช้ MemoryStorage เพื่อไม่บันทึกไฟล์ลงในเครื่อง
    limits: {
      fileSize: 67108864, // 64 MByte
    },
  });
}


const fileUpload = new FileMiddleware();
router.get("/", (req, res) => {
    res.send("api upload OK")
});


router.post("/upfile",fileUpload.memoryLoader.single("file"),async (req, res) => {
    console.log("File "+req.file);
    try {
      // upload รูปภาพลง firebase โดยใช้ parameter ที่ส่งมาใน URL path
      const url = await firebaseUpload(req.file!);
      res.send(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(555).send("Failed to upload image");
    }
    
  }
);

async function firebaseUpload(file: Express.Multer.File) {
    // Upload to firebase storage
    const filename = Date.now() + "-" + Math.round(Math.random() * 1000) + ".png";
    // Define locations to be saved on storag
    const storageRef = ref(storage, "/imagesvs/" + filename);
    // define file detail
    const metaData = { contentType: file.mimetype };
    // Start upload
    const snapshost = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metaData
    );
    // Get url image from storage
    const url = await getDownloadURL(snapshost.ref);
  
    return url;
  }
