/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const axios = require('axios');

module.exports = async function oldestPackageName() {
  let name;
  let pckgeDatesArray = []
  try {
    const response = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: "https://api.npms.io/v2/search/suggestions?q=react",
      method: "GET",
      return_payload: true
    })
    const content = response.data.content
    content.map(item => {
      let pckgeObject = { name: item.package.name, date: item.package.date }
      pckgeDatesArray.push(pckgeObject)
    })
  } catch (err) {
    console.log(err)
  }
  pckgeDatesArray.sort((a, b) => a.date.localeCompare(b.date))
  name = pckgeDatesArray[0].name
  return name
};
