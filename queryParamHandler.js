class queryParamHandler {
  constructor(httpResponse, reject, pool) {
    this.res = httpResponse;
    this.reject = reject;
    this.pool = pool;
  }

  sort (sort) {
    const orderBy = sort.slice(1);
    let order = sort.slice(0, 1);

    if (order === "-") {
      order = "DESC";
    } else if (order === " ") {
      // "+" === " "
      order = "ASC";
    } else {
      this.res.status(400);
      this.res.send({ msg: "sort query should start with a - or +" });
      this.reject(new Error("sort query should start with a - or +"));
    }

    const sortSet = new Set(["deadline", "name", "priority"]);
    if (!sortSet.has(orderBy)) {
      this.res.status(400);
      this.res.send({ msg: "You can only sort by deadline, name or priority" });
      this.reject(new Error("You can only sort by deadline, name or priority"));
    }

    return " ORDER BY " + this.pool.escapeId(orderBy) + order;
  }

  search(str) {
    return ` WHERE MATCH(name, description) AGAINST(${this.pool.escape(str)}) `;
  }

  limit(limit) {
    if (isNaN(limit)) {
      this.res.status(400);
      this.res.send({ msg: "Limit has to be a number" });
      this.reject(new Error("Limit has to be a number"));
    }

    if (Number(limit <= 0)) {
      this.res.status(400);
      this.res.send({ msg: "Limit has to be > 0" });
      this.reject(new Error("Limit has to be > 0"));
    }

    return " LIMIT " + this.pool.escape(Number(limit));
  }

  offset(offset, limit) {
    if (!limit) {
      this.res.status(400);
      this.res.send({ msg: "Can't use offset without limit" });
      this.reject(new Error("Can't use offset without limit"));
    }

    if (isNaN(offset)) {
      this.res.status(400);
      this.res.send({ msg: "Offset has to be a number" });
      this.reject(new Error("Offset has to be a number"));
    }

    if (Number(offset <= 0)) {
      this.res.status(400);
      this.res.send({ msg: "Offset has to be > 0" });
      this.reject(new Error("Offset has to be > 0"));
    }

    return " OFFSET " + this.pool.escape(Number(offset));
  }

  list(list) {
    this.validateList(list);
    return " WHERE list_id = " + this.pool.escape(Number(list))
  }

  searchFromList(search, list) {
    this.validateList(list)
    return this.search(search) + "AND list_id = " + this.pool.escape(Number(list))
  }

  validateList(list) {
    if (isNaN(list)) {
      this.res.status(400);
      this.res.send({ msg: "List has to be a number" })
      this.reject(new Error("List has to be a number"))
    }

    if (Number(list) < 0) {
      this.res.status(400);
      this.res.send({ msg: "List has to be >= 0" });
      this.reject(new Error("List has to be >= 0"));
    }
  }
}

module.exports = queryParamHandler;
