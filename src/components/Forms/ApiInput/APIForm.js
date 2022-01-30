import React, { useState } from "react";
import { randomKey } from "../../../services/config/config";
import { NavBar } from '../../../services/config/navigation';
import { writeDatabase } from "../../../services/dbops";
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

        writeDatabase(`${siteName}`, `${alias}`, `${siteKey}`, `${rateLimited}`, `${hourRate}`, `${userMail}`, `${dateCreated}`, `${_uniqueKey}`);
        clearFormFields();

    };
    return (
        <div className="className">
            <NavBar />
            <form className="api-form" onSubmit={handleSubmit} >
                <label>Link To Site</label>
                <input type="url"
                    id="siteName"
                    name="siteName"
                    required
                    placeholder="e.g https://www.themoviedb.org/"
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

                <label>Generated API Key</label>
                <input type="text"
                    id="siteKey"
                    name="siteKey"
                    placeholder="Enter generated API Key"
                    className="form-field hourly_rate"
                    value={siteKey}
                    onChange={e => setSiteKey(e.target.value)}
                />

                <label htmlFor="rateLimit">Rate Limited?</label>
                <div className="rate_limit" onChange={e => { setRateLimited(e.target.value); }}>
                    <input type="radio" name="rate_limited" className="form-field rate_limitField" value={true} /> Yes
                    <input type="radio" name="rate_limited" className="form-field rate_limitField" value={false} /> No
                </div>
                <div className="hiddenInput" style={{ display: (rateLimited === 'true') ? "contents" : "none" }} >
                    <label htmlFor="hourlyRate"> How Many Requests Per Hour ? </label>
                    <input
                        type="number"
                        name="hourRate"
                        placeholder="How many requests per hour?"
                        className="form-field hourRate"
                        id="hourRate"
                        value={hourRate}
                        onChange={e => setHourRate(e.target.value)}
                    />
                </div>

                <input type="submit" value="submit" className="form-field" />
            </form>
        </div>

    )
}

export default ApiForm;