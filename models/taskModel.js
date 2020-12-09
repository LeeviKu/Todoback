class taskModel {
  constructor(userId, name, description, priority, deadline, list_id) {
    // Add validation.
    this.user_id = userId;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.deadline = deadline;
    this.list_id = list_id;
  }
}

module.exports = taskModel;
