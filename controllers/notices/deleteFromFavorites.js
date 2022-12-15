const { errorHandler } = require("../../helpers/errorHandler");
const { Users } = require("../../service/schemas/Users");

const deleteFromFavorites = async (req, res) => {
  const { userId } = req;
  const { noticeId } = req.params;
  const user = await Users.findById(userId);

  const idx = user.favorites.indexOf(noticeId);
  if (idx === -1) {
    throw errorHandler(400, "Favorite is not found");
  }

  user.favorites.splice(idx, 1);
  await user.save();

  res.json({
    code: 200,
    status: "success",
    message: "Notice is deleted from favorites",
  });
};

module.exports = deleteFromFavorites;
