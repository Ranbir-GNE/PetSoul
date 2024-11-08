const mongoose = require("mongoose");

const VaccinationSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    vaccineName: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
    immunity: {
      type: Number,
    },
    nextDueDate: {
      type: Date,
    },
    vaccineStatus: {
      type: String,
      enum: ["pending", "completed"],
    },
  },
  {
    timestamps: true,
  }
);
VaccinationSchema.index({ petId: 1 });

module.exports = mongoose.model("Vaccination", VaccinationSchema);
