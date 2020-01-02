'use strict';

const db = require('../utils/db');
const docClient = db.getClient();
const uuidv1 = require('uuid/v1');

function create(params) {
  return new Promise((resolve) => {
      resolve(docClient.putAsync(params))
  })
}
async function createItem(params) {
  try {
      let response = await create(params);
      return response;
  }
  catch(error) {
      return error;
  }
}

module.exports.handler = async(event, callback) => {
  const data = {}
  data.id = uuidv1();
  data.email = `${data.id}@icelero.com`

  const params = {
    TableName: 'users',
    Item: data
  };

  let response = await createItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Created Successfully',
        data: response
      },
      null,
      2
    ),
  };
};
