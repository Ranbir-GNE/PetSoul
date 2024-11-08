const HealthRecordModel = require("../Models/HealthRecordSchema");
const VaccinationModel = require("../Models/VaccinationSchema");

const addReport = async (req, res) => {
  try {
    const {
      petId,
      ownerInformation,
      reportType,
      medicalHistory,
      checkupInformation,
      additionalFields,
    } = req.body;

    const newReport = new HealthRecordModel({
      petId,
      ownerInformation: {
        name: ownerInformation.name,
        contactInformation: ownerInformation.contactInformation,
      },
      reportType,
      medicalHistory: {
        allergies: medicalHistory.allergies,
        medications: medicalHistory.medications,
        vaccinations: medicalHistory.vaccinations,
        surgeries: medicalHistory.surgeries,
        illnesses: medicalHistory.illnesses,
        behavioralIssues: medicalHistory.behavioralIssues,
        dietaryRestrictions: medicalHistory.dietaryRestrictions,
      },
      checkupInformation: {
        dateOfCheckup: checkupInformation.dateOfCheckup,
        weight: checkupInformation.weight,
        bodyConditionScore: checkupInformation.bodyConditionScore,
        vitalSigns: {
          temperature: checkupInformation.vitalSigns.temperature,
          heartRate: checkupInformation.vitalSigns.heartRate,
          respiratoryRate: checkupInformation.vitalSigns.respiratoryRate,
        },
        physicalExamFindings: checkupInformation.physicalExamFindings,
        laboratoryResults: checkupInformation.laboratoryResults,
        diagnosticTests: checkupInformation.diagnosticTests,
        treatmentPlan: checkupInformation.treatmentPlan,
      },
      additionalFields: {
        behavioralNotes: additionalFields.behavioralNotes,
      },
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      message: "Report added successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding report",
      error: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const {
      petId,
      ownerInformation,
      reportType,
      medicalHistory,
      checkupInformation,
      additionalFields,
    } = req.body;

    const updatedReport = {
      petId,
      ownerInformation: {
        name: ownerInformation.name,
        contactInformation: ownerInformation.contactInformation,
      },
      reportType,
      medicalHistory: {
        allergies: medicalHistory.allergies,
        medications: medicalHistory.medications,
        vaccinations: medicalHistory.vaccinations,
        surgeries: medicalHistory.surgeries,
        illnesses: medicalHistory.illnesses,
        behavioralIssues: medicalHistory.behavioralIssues,
        dietaryRestrictions: medicalHistory.dietaryRestrictions,
      },
      checkupInformation: {
        dateOfCheckup: checkupInformation.dateOfCheckup,
        weight: checkupInformation.weight,
        bodyConditionScore: checkupInformation.bodyConditionScore,
        vitalSigns: {
          temperature: checkupInformation.vitalSigns.temperature,
          heartRate: checkupInformation.vitalSigns.heartRate,
          respiratoryRate: checkupInformation.vitalSigns.respiratoryRate,
        },
        physicalExamFindings: checkupInformation.physicalExamFindings,
        laboratoryResults: checkupInformation.laboratoryResults,
        diagnosticTests: checkupInformation.diagnosticTests,
        treatmentPlan: checkupInformation.treatmentPlan,
      },
      additionalFields: {
        behavioralNotes: additionalFields.behavioralNotes,
      },
    };

    const updatedRecord = await HealthRecordModel.findByIdAndUpdate(
      req.params.id,
      updatedReport,
      { new: true }
    );

    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating record",
      error: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await HealthRecordModel.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Record deleted successfully",
      record: deletedRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting record",
      error: error.message,
    });
  }
};

const getMedicalHistory = async (req, res) => {
  try {
    const petId = req.params.id;

    if (!petId) {
      return res.status(400).json({
        message: "petId is required to retrieve medical history",
      });
    }

    const medicalHistory = await HealthRecordModel.find(
      { petId },
      { medicalHistory: 1, reportType: 1 }
    );

    res.status(200).json({
      message: "Medical history retrieved successfully",
      medicalHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving medical history",
      error: error.message,
    });
  }
};

const getCheckupInformation = async (req, res) => {
  try {
    const petId = req.params.id;

    if (!petId) {
      return res.status(400).json({
        message: "petId is required to retrieve checkup information",
      });
    }

    const checkupInformation = await HealthRecordModel.find(
      { petId },
      { checkupInformation: 1, reportType: 1 }
    );

    res.status(200).json({
      message: "Checkup information retrieved successfully",
      checkupInformation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving checkup information",
      error: error.message,
    });
  }
};

const getVaccinationRecord = async (req, res) => {
  try {
    const petId = req.params.id;

    if (!petId) {
      return res.status(400).json({
        message: "petId is required to retrieve vaccination record",
      });
    }

    const vaccinationRecord = await VaccinationModel.find(
      { petId },
      { vaccineName: 1, date: 1, nextDueDate: 1, vaccineStatus: 1 }
    );

    res.status(200).json({
      message: "Vaccination record retrieved successfully",
      vaccinationRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving vaccination record",
      error: error.message,
    });
  }
};

module.exports = {
  addReport,
  updateRecord,
  deleteRecord,
  getMedicalHistory,
  getCheckupInformation,
  getVaccinationRecord,
};