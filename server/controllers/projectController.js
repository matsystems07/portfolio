// server/controllers/projectController.js
const path = require('path');
const fs = require('fs');
const projectModel = require('../models/projectModel');  // optional DB

const localPath = path.join(__dirname, '..', 'data', 'projects.json');

exports.getAllProjects = async (req, res, next) => {
  try {
    let projects;

    // Prefer DB if implemented
    if (projectModel.getAll) {
      projects = await projectModel.getAll();
    } else {
      const data = fs.readFileSync(localPath, 'utf8');
      projects = JSON.parse(data);
    }

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const id = req.params.id;

    let projects;
    const data = fs.readFileSync(localPath, 'utf8');
    projects = JSON.parse(data);

    const project = projects.find((p) => p.id == id);

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (err) {
    next(err);
  }
};
