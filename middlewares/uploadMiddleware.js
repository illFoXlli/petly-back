// const fs = require('fs/promises');
const { cloudUpload } = require("../service/modules/cloudinaryService");

const uploadMiddleware = async (req, res, next) => {
  const folder = req.baseUrl.split("/")[2];
  if (!req.file) {
    if (folder === "notices") {
      req.body.photoURL =
        "https://res.cloudinary.com/dnkfxtdl2/image/upload/v1671266714/Catdog_uhpgig.jpg";
    }
    if (folder === "users") {
      req.body.photoURL =
        "https://res.cloudinary.com/dnkfxtdl2/image/upload/v1671447406/users/avatar-person_zinbi4.svg";
    }
    if (folder === "pets") {
      req.body.photoURL =
        "https://res.cloudinary.com/dnkfxtdl2/image/upload/v1671446506/users/dogg_uk5gvs.jpg";
    }
    req.body.photoId = "";
    return next();
  }

  const { path: tempUpload, originalname } = req.file;
  console.log(originalname, req.baseUrl);
  const format = originalname.split(".").pop();
  const { userId } = req;

  // const folder = 'users';
  console.log("folder", folder);

  const id = `${userId + "_" + Date.now()}`;

  try {
    const { resultUrl, resultId } = await cloudUpload(
      tempUpload,
      id,
      folder,
      format
    );

    req.body.photoURL = resultUrl;
    req.body.photoId = resultId;

    next();
  } catch (error) {
    console.log(error);
  }
  // пофиксить, чтоб файл удалялся на клаудинари в тмп
  // finally {
  //    await fs.unlink(req.file.path);
  // }
};

module.exports = uploadMiddleware;
