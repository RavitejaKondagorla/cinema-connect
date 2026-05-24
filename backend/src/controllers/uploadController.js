import User from "../models/User.js";

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const mediaData = {
      url: req.file.location,   // public S3 URL
      key: req.file.key,        // S3 object key
      type: req.file.mimetype,  // image/jpeg, video/mp4
    };

    const user = await User.findById(req.user._id);
    user.media.push(mediaData);
    await user.save();

    res.status(201).json({
      message: "Media uploaded successfully",
      media: mediaData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};