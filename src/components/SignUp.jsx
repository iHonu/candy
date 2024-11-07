import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import { PhoneStep } from "./signup/PhoneStep";
import { PinStep } from "./signup/PinStep";
import { useFetch } from "../hooks/useFetch";
import { formatPhoneNumber, validatePhoneNumber, validatePin } from "../utils/validation";

export default function SignUp() {
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({ phone: "", pin: "" });
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const { userId, sendPhoneNumber, verifyPin } = useFetch();
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (subscriptionSuccess) {
      setRunConfetti(true);
      setTimeout(() => setRunConfetti(false), 4000);
    }
  }, [subscriptionSuccess]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setErrors((error) => ({ ...error, phone: "Phone number is required." }));
      return;
    }
    const formattedNumber = formatPhoneNumber(phoneNumber);
    setPhoneNumber(formattedNumber);

    if (validatePhoneNumber(formattedNumber)) {
      try {
        const data = await sendPhoneNumber(formattedNumber, "ae");
        if (data.success) {
          setStep("pin");
          setPin(data.pin);
        } else {
          setErrors({ ...errors, phone: "Failed to submit phone number. Please try again." });
        }
      } catch (error) {
        setErrors({ ...errors, phone: error.message });
      }
    } else {
      setErrors({ ...errors, phone: "Please enter a valid 10-digit phone number." });
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!pin) {
      setErrors((prev) => ({ ...prev, pin: "PIN is required." }));
      return;
    }
    if (validatePin(pin)) {
      try {
        const data = await verifyPin(pin, userId, "ae");
        if (data.success) {
          setSubscriptionSuccess(true);
          setProductUrl(data.product_url);
        } else {
          setErrors({ ...errors, pin: "Invalid PIN. Please try again." });
        }
      } catch (error) {
        setErrors({ ...errors, pin: error.message });
      }
    } else {
      setErrors({ ...errors, pin: "Please enter a valid 4-digit PIN." });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="background-overlay"></div>
      <div id="signup-form" className="form-container">
        {runConfetti && (
          <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
        )}
        {!subscriptionSuccess ? (
          <>
            <div className="signup-title-wrapper">
              <h2 className="title-singup">SIGN UP</h2>
            </div>
            {step === "phone" ? (
              <PhoneStep
                phoneNumber={phoneNumber}
                setPhoneNumber={(value) => {
                  setPhoneNumber(formatPhoneNumber(value));
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                onSubmit={handlePhoneSubmit}
                error={errors.phone}
              />
            ) : (
              <PinStep
                pin={pin}
                setPin={(value) => {
                  setPin(value.replace(/\D/g, ""));
                  setErrors((prev) => ({ ...prev, pin: "" }));
                }}
                onSubmit={handlePinSubmit}
                error={errors.pin}
              />
            )}
          </>
        ) : (
          <div className="thank-you-message">
            <h2>Thank you!</h2>
            <p>You have successfully subscribed.</p>
            {productUrl && (
              <a href={productUrl} target="_blank" rel="noopener noreferrer">
                Go to Product
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
