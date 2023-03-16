const request = require('request');

//https://api.thecatapi.com/v1/breeds/search?q=[catBreed]


module.exports = (breed, callback) => {
  const options = {
    url: `https://api.thecatapi.com/v1/breeds/search?breed_id="sibe"`,
    headers: {
      'x-api-key': '7e2cb31f-5f9d-4b4b-b872-dd2b2b7a2b9a'
    }
  };

  request(options, (err, resp, body) => {
    if (!err) {
      if (resp.statusCode !== 200) {
        return callback(`Could not connect to the server. statusCode ${resp.statusCode}`);
      } else {
        if (body) {
          body = JSON.parse(body);
          if (body.length) {
            if (body[0].description) {
              return callback(null, body[0].description);
            } else {
              return callback(`No description for this breed, ${breed}, is provided.`);
            }
          } else {
            return callback(`Could not find the breed, ${breed}.`);
          }
        } else {
          return callback(`Recieved empty response from server`);
        }
      }
    } else {
      return callback(`Could not fetch info about '${breed}' cat breed from the server.`);
    }
  });
};