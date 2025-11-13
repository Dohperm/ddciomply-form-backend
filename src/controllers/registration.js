const { StatusCodes } = require("http-status-codes");
const { registrationModel } = require("../models");
// const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");
const { validateRegistration } = require("../models/validations/registration");
const { uploadToCloudinary } = require("../thirdParty/cloudinary");

// const sendEmail = require('../utils/sendEmail')

const uploadFile = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    
    if (files.length === 0) {
      return res.status(400).json({ status: false, msg: "No files uploaded" });
    }

    const uploadPromises = files.map(file => 
      uploadToCloudinary(file.buffer, file.originalname)
    );

    const urls = await Promise.all(uploadPromises);
    
    return res.status(StatusCodes.OK).json({
      status: true,
      msg: "Files uploaded successfully",
      data: urls
    });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

const getAllForms = async (req, res) => {
  try {
    const forms = await registrationModel.find().sort({ createdAt: -1 });
    return res.status(StatusCodes.OK).json({
      status: true,
      msg: "Forms retrieved successfully",
      data: forms
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await registrationModel.findById(id);
    
    if (!form) {
      return res.status(404).json({ status: false, msg: "Form not found" });
    }
    
    return res.status(StatusCodes.OK).json({
      status: true,
      msg: "Form retrieved successfully.",
      data: form
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const submit = async (req, res) => {
  try {
    const params = req.body;
    
    const { error } = validateRegistration(params);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const registration = new registrationModel({ ...params });

    await registration.save();
    return res.status(StatusCodes.OK).json({
      status: true,
      code: 200,
      msg: "Successful.",
      data: registration,
    });
  } catch (error) {
    res.status(400).json({ status_code: 400, error: error.message });
  }
};

module.exports = { submit, uploadFile, getAllForms, getFormById };
