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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

const axios = require('axios');

module.exports = async function organiseMaintainers() {
  try {
    const response = await axios.post('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
      url: "https://api.npms.io/v2/search/suggestions?q=react",
      method: "GET",
      return_payload: true
    });

    const content = response.data.content
    const firstResult = content.reduce((acc, item) => {
      item.package.maintainers.forEach(maintainer => {
        if (acc.hasOwnProperty(`${maintainer.username}`)) {
          acc[maintainer.username].push(item.package.name)
        } else {
          acc[maintainer.username] = [item.package.name]
        }
      });
      return acc;
    }, {});
    const maintainers = Object.keys(firstResult).sort().reduce((acc, item) => {
      acc.push({
        username: item,
        packageNames: firstResult[item].sort()
      });
      return acc;
    }, []);
    return maintainers;
  } catch (err) {
    console.log(err)
  }
};
