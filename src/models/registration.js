const mongoose = require("mongoose");

const registrationModel = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    rcNumber: String,
    organizationType: { type: String, required: true },
    businessSector: { type: String, required: true },
    headOfficeAddress: { type: String, required: true },
    websiteUrl: String,
    contact: {
      officialEmail: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      fullName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
    registrationType: {
      type: String,
      enum: ["Data Controller", "Data Processor", "Both"],
      required: true,
    },
    processesOver2000: { type: Boolean, required: true },
    existingNDPCNumber: String,
    supportingDocuments: [String],
    additionalNotes: String,
    agreedToTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationModel);