const path = require("path");
const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const Form = require("../models/formModel");
const Joi = require("joi");

eventSchema = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().messages({
    "string.base": `Name should be a type of 'text'`,
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
    "any.required": `Name is a required field`,
  }),

  imageURL: Joi.string().required().trim().uri().messages({
    "string.base": `Image URL should be a type of 'text'`,
    "string.empty": `Image URL cannot be an empty field`,
    "string.uri": `Image URL should be a valid URL`,
    "any.required": `Image URL is a required field`,
  }),
  date: Joi.date().required().messages({
    "date.base": `Date should be a type of 'date'`,
    "date.empty": `Date cannot be an empty field`,
    "any.required": `Date is a required field`,
  }),
  time: Joi.string().required().trim().messages({
    "string.base": `Time should be a type of 'text'`,
    "string.empty": `Time cannot be an empty field`,
    "any.required": `Time is a required field`,
  }),
  location: Joi.string().required().trim().messages({
    "string.base": `Location should be a type of 'text'`,
    "string.empty": `Location cannot be an empty field`,
    "any.required": `Location is a required field`,
  }),
  formCreate: Joi.string().required().trim().messages({
    "string.base": `FormCreate should be a type of 'text'`,
    "string.empty": `FormCreate cannot be an empty field`,
    "any.required": `FormCreate is a required field`,
  }),
  description: Joi.alternatives()
    .conditional("formCreate", {
      is: "true",
      then: Joi.string().trim().required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.base": `Description should be a type of 'text'`,
      "string.empty": `Description cannot be an empty field`,
      "any.required": `Description is a required field`,
    }),
  status: Joi.alternatives()
    .conditional("formCreate", {
      is: "true",
      then: Joi.string()
        .trim()
        .valid("upcoming", "ongoing", "completed")
        .required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.base": `Status should be a type of 'text'`,
      "string.empty": `Status cannot be an empty field`,
      "any.only": `Status should be one of 'upcoming', 'ongoing' or 'completed'`,
    }),
  formLink: Joi.alternatives()
    .conditional("formCreate", {
      is: "true",
      then: Joi.string().uri().required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.base": `FormLink should be a type of 'text'`,
      "string.empty": `FormLink cannot be an empty field`,
      "string.uri": `FormLink should be a valid URL`,
    }),
  start: Joi.alternatives()
    .conditional("formCreate", {
      is: "true",
      then: Joi.date().required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "date.base": `Start should be a type of 'date'`,
      "date.empty": `Start cannot be an empty field`,
    }),
  deadline: Joi.alternatives()
    .conditional("formCreate", {
      is: "true",
      then: Joi.date().required(),
      otherwise: Joi.optional(),
    })
    .messages({
      "date.base": `Deadline should be a type of 'date'`,
      "date.empty": `Deadline cannot be an empty field`,
    }),
});


// New Event Form
const newEventForm = (req, res) => {
  res.render(path.join("event", "newEventForm.ejs"), {
    page: {
      title: "New Event",
      name: "New Event",
      description: "New Event",
      path: "/event/new",
      type: "admin",
      styles: ["photoPreview.css"],
      scripts: [
        "https://cdn.ckeditor.com/ckeditor5/41.1.0/decoupled-document/ckeditor.js",
        "event/eventForm.js",
        "photoPreview.js",
      ],
      loggedIn: req.isAuthenticated(),
    },
  });
};

// saving new Event
const createEvent = async (req, res) => {
  console.log(req.body);
  const { error } = eventSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {
    name,
    imageURL,
    date,
    time,
    location,
    formCreate, // Mandatory fields
    description,
    status,
    formLink,
    start,
    deadline, // Optional fields
  } = req.body;
  const newEvent = new Event({
    name,
    image: imageURL,
    date: new Date(date + " " + time),
    location,
  });
  if (formCreate === "true") {
    const newForm = new Form({
      name: name,
      description,
      status,
      link: formLink,
      start: new Date(start),
      deadline: new Date(deadline),
      applicant: new mongoose.Types.ObjectId(req.user._id),
    });
    const savedForm = await newForm.save();
    newEvent.form = savedForm._id;
  }

  await newEvent.save();
  console.log(newEvent);
  res
    .status(201)
    .json({ message: "New event created with ID " + newEvent.eventId + "." });
};

const index = async (req, res) => {
  const events = await Event.find().sort({
    eventId: -1,
  }).populate("form").lean();
  res.render(path.join("event", "index.ejs"), {
    page: {
      title: "Events",
      name: "Events",
      description: "Events",
      path: "/events",
      type: "admin",
      styles: ["event.css"],
      scripts: ["event/event.js"],
      loggedIn: req.isAuthenticated(),
      events,
    },
  });
};

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findOneAndDelete({ eventId: id });
    if (!event) {
      return res.status(404).render(path.join("public", "error.ejs"), {
        page: {
          title: "Error",
          name: "Error",
          description: "Error",
          path: "/error",
          type: "admin",
          styles: [],
          scripts: [],
          loggedIn: req.isAuthenticated(),
          message: "Event not found",
        },
      });

    }
    // Redirect to events page
    res.status(302).redirect("/event");
  } catch (err) {
    console.log(err);
    return res.status(500).render(path.join("public", "error.ejs"), {
      page: {
        title: "Error",
        name: "Error",
        description: "Error",
        path: "/error",
        type: "admin",
        styles: [],
        scripts: [],
        loggedIn: req.isAuthenticated(),
        message: "Internal Server Error",
      },
    });
  }
};

module.exports = {
  newEventForm,
  createEvent,
  index,
  deleteEvent,
};
