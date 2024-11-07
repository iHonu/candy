// hooks/useApi.js
import { useState } from "react";

export function useFetch() {
  const [userId, setUserId] = useState("");
  
  const sendPhoneNumber = async (phoneNumber, country) => {
    try {
      const generatedUserId = Math.random().toString(36).substring(2, 15);
      setUserId(generatedUserId);
      
      const response = await fetch("https://0ct5ps-3001.csb.app/api/v1/trigger-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msisdn: phoneNumber.replace(/\D/g, ""),
          user_id: generatedUserId,
          country,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error submitting phone number:", error);
      throw new Error("An error occurred. Please try again.");
    }
  };

  const verifyPin = async (pin, userId, country) => {
    try {
      const response = await fetch("https://0ct5ps-3001.csb.app/api/v1/verify-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin: Number(pin),
          user_id: userId,
          country,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error validating PIN:", error);
      throw new Error("An error occurred. Please try again.");
    }
  };

  return { userId, sendPhoneNumber, verifyPin };
}
