import Favs from "../models/favs.model.js";
import { errorResponse, successResponse } from "./../utils/index.js";

/**
 * ## createFavs
 */
const createFavs = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const favs = await Favs.create({ ...req.body, owner: id });
    successResponse(res, 201, "Favs created", favs);
  } catch (error) {
    next(error);
  }
};

/**
 * ## getAllFavs
 */
const getAllFavs = async (req, res, next) => {
  try {
    const arrFavs = await Favs.findAll(req);
    successResponse(res, 200, null, arrFavs);
  } catch (error) {
    next(error);
  }
};

/**
 * ## findById
 */
const findById = async (req, res, next, id) => {
  try {
    const favs = await Favs.findById(id);
    if (!favs) throw errorResponse(404, "Favs list not found");
    req.favs = favs;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * ## getOneFavs
 */
const getOneFavs = async (req, res, next) => {
  try {
    const { favs } = req;
    successResponse(res, 200, null, favs);
  } catch (error) {
    next(error);
  }
};

/**
 * ## updateFavs
 */
const updateFavs = async (req, res, next) => {
  try {
    const { favs } = req;
    Object.assign(favs, req.body);
    const updated = await favs.save();
    successResponse(res, 200, "Favs list has been updated", updated);
  } catch (error) {
    next(error);
  }
};

/**
 * ## deleteFavs
 */
const deleteFavs = async (req, res, next) => {
  try {
    const { favs } = req;
    const removed = await favs.remove();
    successResponse(res, 200, "Favs list has been removed", removed);
  } catch (error) {
    next(error);
  }
};

export { findById, createFavs, getAllFavs, getOneFavs, updateFavs, deleteFavs };
