const ComicBook = require("../models/comicBookModel");

// Create a new comic book
exports.createComicBook = async (req, res) => {
  try {
    // Create a new instance of ComicBook with the request body
    const comicBook = new ComicBook(req.body);
    // Save the comic book to the database
    await comicBook.save();
    // Respond with the created comic book and a 201 status code
    res.status(201).json(comicBook);
  } catch (error) {
    // Respond with a 400 status code and error message if an error occurs
    res.status(400).json({ message: error.message });
  }
};

// Retrieve a list of comic books with pagination and sorting
exports.getComicBooks = async (req, res) => {
  // Destructure query parameters with default values
  const { page = 1, limit = 10, sort = "bookName", filter = {} } = req.query;

  try {
    // Find comic books with the specified filter, sort, limit, and pagination
    const comicBooks = await ComicBook.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    // Count total comic books for pagination
    const count = await ComicBook.countDocuments(filter);
    // Respond with the list of comic books and pagination info
    res.json({
      comicBooks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    // Respond with a 400 status code and error message if an error occurs
    res.status(400).json({ message: error.message });
  }
};

// Retrieve a comic book by its ID
exports.getComicBookById = async (req, res) => {
  try {
    // Find a comic book by its ID
    const comicBook = await ComicBook.findById(req.params.id);
    // If not found, respond with a 404 status code
    if (!comicBook)
      return res.status(404).json({ message: "Comic book not found" });
    // Respond with the comic book details
    res.json(comicBook);
  } catch (error) {
    // Respond with a 400 status code and error message if an error occurs
    res.status(400).json({ message: error.message });
  }
};

// Update a comic book by its ID
exports.updateComicBook = async (req, res) => {
  try {
    // Find the comic book by ID and update it with the new data
    const comicBook = await ComicBook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    // If not found, respond with a 404 status code
    if (!comicBook)
      return res.status(404).json({ message: "Comic book not found" });
    // Respond with the updated comic book details
    res.json(comicBook);
  } catch (error) {
    // Respond with a 400 status code and error message if an error occurs
    res.status(400).json({ message: error.message });
  }
};

// Delete a comic book by its ID
exports.deleteComicBook = async (req, res) => {
  try {
    // Find and delete the comic book by ID
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
    // If not found, respond with a 404 status code
    if (!comicBook)
      return res.status(404).json({ message: "Comic book not found" });
    // Respond with a success message
    res.json({ message: "Comic book deleted" });
  } catch (error) {
    // Respond with a 400 status code and error message if an error occurs
    res.status(400).json({ message: error.message });
  }
};
