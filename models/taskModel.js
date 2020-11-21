class taskModel {
  constructor(userId, name, description, priority, deadline) {
    // Add validation.
    this.user_id = userId;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.deadline = deadline;
  }
}

module.exports = taskModel;
