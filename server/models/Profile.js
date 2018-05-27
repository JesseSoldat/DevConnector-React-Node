const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
        trim: true
      },
      company: {
        type: String,
        required: true,
        trim: true
      },
      location: {
        type: String,
        trim: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        trim: true
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
        trim: true
      },
      degree: {
        type: String,
        required: true,
        trim: true
      },
      fieldofstudy: {
        type: String,
        required: true,
        trim: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        trim: true
      }
    }
  ],
  social: {
    youtube: {
      type: String,
      trim: true,
      default: ""
    },
    twitter: {
      type: String,
      trim: true,
      default: ""
    },
    facebook: {
      type: String,
      trim: true,
      default: ""
    },
    linkedin: {
      type: String,
      trim: true,
      default: ""
    },
    instagram: {
      type: String,
      trim: true,
      default: ""
    }
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
