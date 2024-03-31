const Message = require("./model");

// Render Controller: Render index.html with Messages using EJS
const renderMessages = async (req, res) => {
  try {
    const Messages = await Message.find({});
    res.render("../views/index", { Messages }); // Render index.ejs with Messages data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get all Messages
const getMessages = async (req, res) => {
  try {
    const Messages = await Message.find({});
    res.status(200).json(Messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add one Message
const addMessage = async (req, res) => {
  try {
    const {  sender, recipient, content } = req.body;
    const newMessage = new Message({  sender, recipient, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "try again later" });
  }
};

// Delete all Messages
const deleteAllMessages = async (req, res) => {
  try {
    const result = await Message.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "try again later" });
  }
};

module.exports = {
  getMessages,
  renderMessages,
  addMessage,
  deleteAllMessages,
};