const ReportModel = require("../models/Report");

const addReport = async (req, res) => {
  try {
    const {
      petId,
      vitalSigns,
      physicalExamination,
      laboratoryTests,
      additionalTests,
    } = req.body;

    if (!petId) {
      return res.status(400).json({ message: "Pet ID is required" });
    }

    const newReport = new ReportModel({
      petId,
      vitalSigns,
      physicalExamination,
      laboratoryTests,
      additionalTests,
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

const updateReports = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Report ID is required" });
  }
  const existReport = await ReportModel.findOne(id);
  if (!existReport) {
    return res.status(404).json({ message: "No Reports Found" });
  }
  try {
    const report = await ReportModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );
    if (!report) {
      return res.status(404).json({ message: "Could Not Update Report" });
    }
    res.status(200).json(report);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = addReport;
