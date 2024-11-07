export const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    return match ? `${match[1] ? `(${match[1]}` : ""}${match[2] ? `) ${match[2]}` : ""}${match[3] ? `-${match[3]}` : ""}` : value;
  };
  
  export const validatePhoneNumber = (number) => {
    return /^\(\d{3}\) \d{3}-\d{4}$/.test(number);
  };
  
  export const validatePin = (pin) => {
    return /^\d{4}$/.test(pin);
  };