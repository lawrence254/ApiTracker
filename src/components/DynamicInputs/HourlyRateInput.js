function HourlyRateInput(props) {
    return (
        <input
            type="text"
            name="hourlyRate"
            className="form-field hourlyRate"
            id="hourlyRate"
            value={hourlyRate}
            onChange={e => setHourlyRate(e.target.value)}
        />
    );
}
