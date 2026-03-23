//error handler middleware

// Global error handler 
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate entry already exists" });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
