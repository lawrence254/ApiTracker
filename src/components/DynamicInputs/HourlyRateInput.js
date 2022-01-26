function HourlyRateInput({ props }) {
    // const provideRate = (hourRate) => {
    //     this.provideHourlyRate = hourRate;
    // }
    return (
        <div>
            <label htmlFor="hourlyRate">Hourly Rate in Hours</label>
            <input
                type="text"
                name="hourRate"
                className="form-field hourRate"
                id="hourRate"
                value={0}
                onChange={e => this.props.onUpdateHourlyRate(e.target.value)}
            />
        </div >
    );
}
export default HourlyRateInput;
