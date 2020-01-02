'use strict';

const db = require('../utils/db');
const docClient = db.getClient();


function getAllItems(params) {
  return new Promise((resolve) => {
      resolve(docClient.scanAsync(params))
  })
}
async function getItems(params) {
  try {
      let response = await getAllItems(params);
      return response;
  }
  catch(error) {
      return error;
  }
}

exports.handler = async(event, context) => {
  const params = {
    TableName: 'users',
  };

  let response = await getItems(params);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Executed Successfully',
        data: response
      },
      null,
      2
    ),
  };
}



