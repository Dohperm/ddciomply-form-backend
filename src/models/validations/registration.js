const Joi = require("joi");

exports.validateRegistration = (model) => {
  const schema = Joi.object({
    organizationName: Joi.string()
      .required()
      .messages({
        "any.required": "Organization name is required.",
        "string.empty": "Organization name cannot be empty.",
        "string.base": "Organization name must be a string.",
      }),
    rcNumber: Joi.string()
      .allow(null, "")
      .messages({
        "string.base": "RC Number must be a string.",
      }),
    organizationType: Joi.string()
      .required()
      .messages({
        "any.required": "Organization type is required.",
        "string.empty": "Organization type cannot be empty.",
        "string.base": "Organization type must be a string.",
      }),
    businessSector: Joi.string()
      .required()
      .messages({
        "any.required": "Business sector is required.",
        "string.empty": "Business sector cannot be empty.",
        "string.base": "Business sector must be a string.",
      }),
    headOfficeAddress: Joi.string()
      .required()
      .messages({
        "any.required": "Head office address is required.",
        "string.empty": "Head office address cannot be empty.",
        "string.base": "Head office address must be a string.",
      }),
    websiteUrl: Joi.string()
      .uri()
      .allow(null, "")
      .messages({
        "string.base": "Website URL must be a string.",
        "string.uri": "Website URL must be a valid URI.",
      }),
    contact: Joi.object({
      officialEmail: Joi.string()
        .email()
        .required()
        .messages({
          "any.required": "Official email is required.",
          "string.empty": "Official email cannot be empty.",
          "string.email": "Official email must be a valid email address.",
        }),
      phoneNumber: Joi.string()
        .required()
        .messages({
          "any.required": "Phone number is required.",
          "string.empty": "Phone number cannot be empty.",
          "string.base": "Phone number must be a string.",
        }),
      fullName: Joi.string()
        .required()
        .messages({
          "any.required": "Full name is required.",
          "string.empty": "Full name cannot be empty.",
          "string.base": "Full name must be a string.",
        }),
      role: Joi.string()
        .required()
        .messages({
          "any.required": "Role is required.",
          "string.empty": "Role cannot be empty.",
          "string.base": "Role must be a string.",
        }),
    })
      .required()
      .messages({
        "any.required": "Contact information is required.",
        "object.base": "Contact must be an object.",
      }),
    registrationType: Joi.string()
      .valid("Data Controller", "Data Processor", "Both")
      .required()
      .messages({
        "any.only":
          "Registration type must be one of 'Data Controller', 'Data Processor', or 'Both'.",
        "any.required": "Registration type is required.",
        "string.empty": "Registration type cannot be empty.",
      }),
    processesOver2000: Joi.boolean()
      .required()
      .messages({
        "any.required": "Processes over 2000 is required.",
        "boolean.base": "Processes over 2000 must be a boolean.",
      }),
    existingNDPCNumber: Joi.string()
      .allow(null, "")
      .messages({
        "string.base": "Existing NDPC number must be a string.",
      }),
    supportingDocuments: Joi.array()
      .items(Joi.string())
      .messages({
        "array.base": "Supporting documents must be an array of strings.",
        "string.base": "Each supporting document must be a string.",
      }),
    additionalNotes: Joi.string()
      .allow(null, "")
      .messages({
        "string.base": "Additional notes must be a string.",
      }),
    agreedToTerms: Joi.boolean()
      .required()
      .valid(true)
      .messages({
        "any.only": "You must agree to the terms.",
        "any.required": "Agreement to terms is required.",
        "boolean.base": "Agreed to terms must be a boolean.",
      }),
  }).unknown(true);

  return schema.validate(model);
};