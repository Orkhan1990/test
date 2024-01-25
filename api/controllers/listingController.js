import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  if (req.user.id != req.body.userRef) {
    return res
      .status(401)
      .json({ status: false, message: "You can not create listing" });
  }
  try {
    const newListing = await Listing.create(req.body);
    return res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res
      .status(401)
      .json({ status: false, message: "Listing not exist!" });
  }

  if (req.user.id != req.listing.userRef) {
    return res
      .status(401)
      .json({
        status: false,
        message: "You can only update your own listing!",
      });
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(204).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const deleteLisitng = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res
      .status(401)
      .json({ status: false, message: "Listing not exist!" });
  }

  if (listing.userRef !== req.user.id) {
    return res
      .status(401)
      .json({
        status: false,
        message: "You can only delete your own listing!",
      });
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ status: true, message: "Listing successfuly deleted!" });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res
        .status(401)
        .json({ success: false, message: "Listing not exist" });
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "false") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      type,
      parking,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    if (!listings) {
      return res
        .status(401)
        .json({ success: false, message: "Listing not exist!" });
    }

    res.status(201).json(listings);
  } catch (error) {
    next(error);
  }
};
