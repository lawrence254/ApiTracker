const rawDB = '../Data/apis.json';
const axios = require('axios');

export const writeDatabase = async (siteName, alias, siteKey, rateLimited, hourRate, userMail, dateCreated, _uniqueKey) => {
    // const json = JSON.stringify(data);
    axios.post('http://localhost:8080/results', {
        provider: siteName,
        Site_Alias: alias,
        data: {
            Key: siteKey,
            Rate_Limited: rateLimited,
            Rate_Per_Hour: hourRate,
            User_Email: userMail
        },
        date_registered: dateCreated,
        keyID: _uniqueKey
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });
}

export let results = [];
async function getData() {
    const response = await axios.get('http://localhost:8080/results')
    return results.push(response.data)
}
console.log(results)
// let data
// axios.get('http://localhost:8080/results')
//     .then(resp => {
//         data = resp.data
//         // let getData = resp.data
//         // console.log(data);
//         // response = data;
//         // console.log(data);
//         return data;
//     })
//     .catch(error => {
//         console.log(error);
//     });
// console.log(getData)


