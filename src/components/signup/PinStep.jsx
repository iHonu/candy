import PropTypes from 'prop-types';

export function PinStep({ pin, setPin, onSubmit, error }) {
  return (
    <form onSubmit={onSubmit} className="form">
      <label htmlFor="pin" className="label">Enter the PIN sent to your phone</label>
      <input
        id="pin"
        type="text"
        inputMode="numeric"
        maxLength={4}
        placeholder="1234"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
        className={`input ${error ? "input-error" : ""}`}
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn-submit">Verify PIN</button>
    </form>
  );
}

PinStep.propTypes = {
    pin: PropTypes.string.isRequired,
    setPin: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  }; 