import PostModel from "../models/Post.model.js";

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось создать статью",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "couldnt get tags" });
  }
};

export const remove = async (req, res) => {
  const postId = req.params.id;
  try {
    await PostModel.findOneAndRemove({ _id: postId });
    res.json({ message: "статья удалена" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "не удалось удалить статью" });
  }
};
export const getOne = async (req, res) => {
  const postId = req.params.id;
  try {
    const doc = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    ).populate("user");

    if (!doc) {
      return res.status(404).json({
        message: "не удалось найти статью",
      });
    }
    res.json(doc);
  } catch (error) {
    console.log(error);
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не удалось получить статьи",
    });
  }
};
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({ message: "статья обновлена" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ошибка при получении статьи",
    });
  }
};
