// const rawDB = '../Data/apis.json';
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



