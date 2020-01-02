'use strict';

const db = require('../utils/db');
const docClient = db.getClient();

function deleteItm(params) {
  return new Promise((resolve) => {
      resolve(docClient.deleteAsync(params))
  })
}
async function deleteItem(params) {
  try {
      let response = await deleteItm(params);
      return response;
  }
  catch(error) {
      return error;
  }
}

module.exports.handler = async(event, callback) => {
  const body = JSON.parse(event.body)
  const email = `${body.id}@icelero.com`
  const params = {
    TableName : 'users',
    Key: {
      id: body.id,
      email: email
    }
  };

  let response = await deleteItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Deleted Successfully',
        data: response
      },
      null,
      2
    ),
  };
};
