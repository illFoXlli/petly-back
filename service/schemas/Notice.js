const { Schema, model } = require("mongoose");
const Joi = require("joi");

const categories = ["sell", "lost-found", "for-free"];

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: {
        values: categories,
        message: `{VALUE} must be one of ${categories}`,
      },
      required: [true, "Category is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: Date.now(),
    },
    breed: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} must be one of [`male`,`female`]",
      },
      required: [true, "Sex is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    photoURL: {
      type: String,
      default: "",
    },
    photoId: {
      type: String,
      default: "",
    },
    comments: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

const addSchema = Joi.object({
  category: Joi.string()
    .allow(...categories)
    .required(),
  title: Joi.string().min(2).max(48).required(),
  sex: Joi.string()
    .allow("male", "female")
    .required()
    .error(() => {
      return {
        message: "Sex allow only 'male', 'female' ",
      };
    }),
  location: Joi.string().required(),
  name: Joi.string().min(2).max(16),
  breed: Joi.string().min(2).max(24),
  photoURL: Joi.string(),
  photoId: Joi.string().min(0),
  comments: Joi.string().min(8).max(120),
  birthday: Joi.date(),
  price: Joi.number().min(1),
});

// const schemasJoiNotice = {
//   addSchema,
// };

module.exports = {
  Notice,
  addSchema,
  categories,
};
