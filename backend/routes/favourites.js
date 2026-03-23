const express = require("express");
const { body, validationResult } = require("express-validator");
const Favourite = require("../models/Favourite");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

// Get all favourites for the logged-in user
router.get("/", async (req, res, next) => {
  try {
    const favourites = await Favourite.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(favourites);
  } catch (error) {
    next(error);
  }
});

// Add a new favourite
router.post(
  "/",
  [body("propertyId").notEmpty().withMessage("Property ID is required")],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { propertyId } = req.body;

      // Check for duplicate
      const existing = await Favourite.findOne({
        userId: req.user.id,
        propertyId,
      });
      if (existing) {
        return res.status(409).json({ message: "Property already in favourites" });
      }

      const favourite = await Favourite.create({
        userId: req.user.id,
        propertyId,
      });

      res.status(201).json(favourite);
    } catch (error) {
      next(error);
    }
  }
);

// Remove a favourite
router.delete("/:propertyId", async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    const favourite = await Favourite.findOneAndDelete({
      userId: req.user.id,
      propertyId,
    });

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    res.json({ message: "Favourite removed" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
