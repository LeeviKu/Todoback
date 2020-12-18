class taskModel {
  constructor(userId, name, description, priority, deadline, list_id) {
    // send error to request
    this.user_id = userId;
    this.name = this.validateName(name)
    this.description = this.validateDescription(description)
    this.priority = this.validatePriority(priority);
    this.deadline = this.validateDeadline(deadline);
    this.list_id = this.validateList(list_id);
  }

  validateName(name) {
    if (typeof name !== 'string') {
      throw new Error("name is not a string")
    }

    if (name.length < 2 || name.length > 50) {
      throw new Error("name is not 2-50 characters long")
    }

    return name;
  }

  validateDescription(description) {
    if (typeof description !== 'string') {
      throw new Error("description is not a string")
    }
    
    if (description.length < 2 || description.length > 200) {
      throw new Error("description is not 2-200 characters long")
    }

    return description;
  }

  validatePriority(priority) {
    priority = Number(priority);

    if (isNan(priority)) {
      throw new Error("priority is not a number");
    }

    if (priortiy < 1 || priority > 5) {
      throw new Error("priority is not between 1-5");
    }

    return priority;
  }

  validateDeadline(deadline) {
    return deadline;
  }

  validateList(list_id) {
    list_id = Number(list_id);

    if (isNan(list_id)) {
      throw new Error("list_id is not a number")
    }

    if (list_id < 0) {
      throw new Error("list_id can't be negative")
    }

    return list_id;
  }
}

module.exports = taskModel;
