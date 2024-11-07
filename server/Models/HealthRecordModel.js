const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthRecordSchema = new Schema({
  petId: { type: String, index: true, trim: true },
  ownerInformation: {
    name: { type: String, trim: true },
    contactInformation: { type: String, trim: true },
  },
  reportType: { type: String, trim: true },
  medicalHistory: {
    allergies: [{ type: String, trim: true }],
    medications: [{ type: String, trim: true }],
    vaccinations: { type: mongoose.SchemaTypes.ObjectId, ref: "Vaccination" },
    surgeries: [{ type: String, trim: true }],
    illnesses: [{ type: String, trim: true }],
    behavioralIssues: [{ type: String, trim: true }],
    dietaryRestrictions: [{ type: String, trim: true }],
  },
  checkupInformation: {
    dateOfCheckup: { type: Date },
    weight: { type: Number },
    bodyConditionScore: { type: String, trim: true },
    vitalSigns: {
      temperature: { type: Number },
      heartRate: { type: Number },
      respiratoryRate: { type: Number },
    },
    physicalExamFindings: { type: String, trim: true },
    laboratoryResults: { type: String, trim: true },
    diagnosticTests: { type: String, trim: true },
    treatmentPlan: { type: String, trim: true },
  },
  additionalFields: {
    behavioralNotes: [{ type: String, trim: true }],
  },
});

healthRecordSchema.index({ petId: 1 });

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
