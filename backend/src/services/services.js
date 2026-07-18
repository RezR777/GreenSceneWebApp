/**
* GreenScene Service Layer with centralized business logic
*/
import Event from "../models/Event.js";
import User from "../models/User.js";
import RSVP from "../models/RSVP.js";

// ------ Event Services ------ //

export const getUpcomingEvents = async () => {

  return await Event.find({
    date: { $gte: new Date() }
  }).sort({ date: 1 });

};

export const getFeaturedEvents = async () => {

  return await Event.find({
    featured: true
  });

};

export const searchEvents = async (keyword) => {

  return await Event.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },

      { description: { $regex: keyword, $options: "i" } },

      { location: { $regex: keyword, $options: "i" } },

      ]

  });

};

// ------ RSVP Services ------ //

export const getUserProfile = async (id) => {

  return await User.findById(id);

};

export const updateUserProfile = async (id, data) => {

  return await User.findByIdAndUpdate(

    id,

    data,

    { new: true }

  );

};

// ------ Google Calendar ------ //

export const syncEventToGoogleCalendar = async (event) => {

  console.log('Synching "$(event.title)" to Google Calendar...');

  /* Here, we have future implementations like Google Calendar API, and creating, updating, and deleting calendar events. */

  return true;

};

// ------ AI Recommendation Engine ------ //

export const recommendEvents = async (interests = []) => {

  return await Event.find({

       category: {

            $in: interests
       }

  });

};
