'use strict';

const db = require('../utils/db');
const docClient = db.getClient();

function updateItm(params) {
  return new Promise((resolve) => {
      resolve(docClient.updateAsync(params))
  })
}
async function updateItem(params) {
  try {
      let response = await updateItm(params);
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
      email: body.email
    }
  };

  let response = await updateItem(params);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Updated Successfully',
        data: response
      },
      null,
      2
    ),
  };
};
