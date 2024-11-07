import PropTypes from 'prop-types';

export function PhoneStep({ phoneNumber, setPhoneNumber, onSubmit, error }) {
  return (
    <form onSubmit={onSubmit} className="form">
      <label htmlFor="phone" className="label">
        Enter your phone number
      </label>
      <input
        id="phone"
        type="tel"
        placeholder="(123) 456-7890"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={`input ${error ? "input-error" : ""}`}

      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn-submit">Send PIN</button>
    </form>
  );
}

PhoneStep.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};