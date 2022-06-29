const express = require("express");

const getAllTasks = (req, res) => {
  res.send("get tasks");
};

const getSingleTask = (req, res) => {
  res.send("get task");
};

const createTask = (req, res) => {
  res.send("create new task");
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
}