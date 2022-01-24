import React, { useState } from "react";
import { DB_NAME, randomKey, _store } from "../../../services/config/config";
import { writeDatabase } from "../../../services/dbops";
import DB from "../../../services/lib/tiny-idb";
// import { data_store } from "../../../services/queries";
import './styles.css';


function ApiForm() {
    const [siteName, setSiteName] = useState('');
    const [siteKey, setSiteKey] = useState('');
    const [rateLimited, setRateLimited] = useState(false);
    const [hourRate, setHourRate] = useState('');
    const [userMail, setUserMail] = useState('');
    const [alias, setAlias] = useState('');
    const [dateCreated, setDateCreated] = useState(new Date())
    let _uniqueKey = randomKey;

    const hourlyRateStatus = true;

    const handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    const insertToDB = async (apiData, _uniqueKey) => {
        const db = await DB.openDB(DB_NAME, 1);
        const keystore = await DB.transaction(db, [_store], "readwrite").getStore("keys");
        await DB.addObjectData(keystore, {
            keyID: _uniqueKey,
            data: apiData,
        });

        clearFormFields();

    }

    const clearFormFields = () => {
        setAlias('');
        setHourRate('');
        setRateLimited(false);
        setSiteKey('');
        setSiteName('');
        setUserMail('');
        window.location.reload(true);
    }

    const handleSubmit = (event) => {
        console.log(_uniqueKey);
        event.preventDefault();

        let apiData = JSON.stringify({
            provider: `${siteName}`, Site_Alias: `${alias}`,
            data: { Key: `${siteKey}`, Rate_Limited: `${rateLimited}`, Rate_Per_Hour: `${hourRate}`, User_Email: `${userMail}` },
            date_registered: `${dateCreated}`,
            keyID: `${_uniqueKey}`
        });

        insertToDB(apiData, _uniqueKey);
        writeDatabase(`${siteName}`, `${alias}`, `${siteKey}`, `${rateLimited}`, `${hourRate}`, `${userMail}`, `${dateCreated}`, `${_uniqueKey}`);
    };
    return (
        <div className="className">
            <form className="api-form" onSubmit={handleSubmit} >
                <label>Site</label>
                <input type="text"
                    id="siteName"
                    name="siteName"
                    placeholder="Enter the link to the site"
                    className="form-field siteName"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)} />

                <label>Alias</label>
                <input type="text"
                    id="alias"
                    name="alias"
                    placeholder="Enter the site name or an alias to refer to the site"
                    className="form-field alias"
                    value={alias}
                    onChange={e => setAlias(e.target.value)}
                />

                <label>Registered To</label>
                <input type="email"
                    id="userMail"
                    name="userMail"
                    required
                    placeholder="Enter the account used to register for the API"
                    className="form-field userMail"
                    value={userMail}
                    onChange={e => setUserMail(e.target.value)} />

                <label>Key</label>
                <input type="text"
                    id="siteKey"
                    name="siteKey"
                    placeholder="Enter generated API Key"
                    className="form-field siteKey"
                    value={siteKey}
                    onChange={e => setSiteKey(e.target.value)}
                />

                <label htmlFor="rateLimit">Rate Limited?</label>
                <div className="rate_limit">
                    <input type="radio" name="rate_limited" className="form-field rate_limitField" value={true} onChange={e => setRateLimited(e.target.value)} /> Yes
                    <input type="radio" name="rate_limited" className="form-field rate_limitField" value={false} onChange={e => setRateLimited(e.target.value)} /> No
                </div>

                <label>Hourly Rate</label>
                <input type="text"
                    id="siteKey"
                    name="siteKey"
                    placeholder="Enter generated API Key"
                    className="form-field hourly_rate"
                    value={siteKey}
                    onChange={e => setSiteKey(e.target.value)}
                />

                <input type="submit" value="submit" className="form-field" />
            </form>
        </div>

    )
}

export default ApiForm;