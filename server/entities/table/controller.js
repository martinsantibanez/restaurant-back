const Table = require('./model');

const getAllTables = () => {
  return new Promise((resolve, reject) => {
    Table
    .find()
    .populate('waiter')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single table
 * @param  {String} table_id
 * @return {Promise}
 */
const getTable = (table_id) => {
  // console.log(table_id);
  return new Promise((resolve, reject) => {
    Table
    .findById(table_id)
    .populate('waiter')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createTable = (table) => {
  return new Promise((resolve, reject) => {
    const newTable = new Table({
      number: table.number,
      status: "AVAILABLE"
    });

    newTable.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newTable); }
    });
  });
}

const assignTable = (table_id, user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    Table.findById(table_id, (error, table) => {
      if(error || !table) reject(error);
      else
        if(table.status == "AVAILABLE"){
          table.status = "OPEN";
          table.waiter = user;
          table.save((error) => {
            if(error) reject(error);
            else resolve(table);
          });
        } else reject(new Error("Already assignn"));
    });
  });
}

const editTable = (table_id, table) => {
  return new Promise((resolve, reject) => {
    Table
    .findByIdAndUpdate(table_id, table, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteTable = (table_id) => {
  return new Promise((resolve, reject) => {
    Table
    .findByIdAndRemove(table_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllTables,
  getTable,
  createTable,
  editTable,
  deleteTable,
  assignTable
}