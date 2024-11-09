const ReportModel = require("../models/Report");

const addReport = async (req, res) => {
  try {
    const {
      petId,
      reportType,
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
      reportType,
      vitalSigns,
      physicalExamination,
      laboratoryTests,
      additionalTests,
    });

    const savedReport = await newReport.save();
    const record = await RecordModel.findOneAndUpdate(
      { petId: petId },
      {
        $push: {
          presentReports: savedReport._id,
        },
      },
      { new: true, runValidators: true }
    );
    if (!record) {
      return res
        .status(404)
        .json({ message: "Could Not Update Report in Record" });
    }

    res.status(201).json({
      message: "Report added successfully",
      report: savedReport,
      record,
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

const deleteReport = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Report ID is required" });
  }
  try {
    const report = await ReportModel.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ message: "Could Not Delete Report" });
    }
    const record = await RecordModel.findOneAndUpdate(
      { presentReports: id },
      {
        $pull: {
          presentReports: id,
        },
      },
      { new: true, runValidators: true }
    );
    if (!record) {
      return res
        .status(404)
        .json({ message: "Could Not Update Record after deleting Report" });
    }
    res.status(200).json(report, { message: "Report Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const viewPetReport = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Pet ID is required" });
  }
  try {
    const report = await ReportModel.find({ petId: id });
    if (!report) {
      return res.status(404).json({ message: "No Reports Found" });
    }
    res
      .status(200)
      .json(report, { message: "Reports Found for this Pet found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addReport, updateReports, deleteReport, viewPetReport };
