import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (err) {
    next();
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "Listing not found"));
  if (req.user.id !== listing.userRef)
    return next(
      errorHandler(401, "You can only make changes to personal Listing")
    );
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (err) {}
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "Listing not found"));
  if (req.user.id !== listing.userRef)
    return next(
      errorHandler(401, "You can only make changes to personal Listing")
    );
  try {
    const updatedlisting = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedlisting);
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(401, "Listing not found"));
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return next(errorHandler(401, "User not found"));
    const {password : pass , ...rest} = user._doc;
    res.status(200).json(rest); 
  } catch (err) {
    next(err);
  }
};
