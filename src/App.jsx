import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {

  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function countryCodeChangeHandler(value) {
    setCountryCode(value.trim().replace("+", ""));
  }

  function phoneNumberChangeHandler(value) {
    setPhoneNumber(value);
  }

  function submitHandler() {
    const url = `https://wa.me/${countryCode}${phoneNumber}`;
    console.log("Anand: url", url )
    window.open(url, "_blank");
  }


  return (
    <>
      <div className="px-4 py-12 space-y-8 md:py-24 md:space-y-12 flex items-center justify-center">
        <div className="container space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              Send WhatsApp Message without Saving Number
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the country code and phone number below to start a chat.
            </p>
          </div>
          <div className="space-y-2 text-center">
            <Label htmlFor="country-code">Country code</Label>
            <Input
              className="max-w-xs mx-auto"
              id="country-code"
              placeholder="Enter the country code"
              onChange={(e) => countryCodeChangeHandler(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-center">
            <Label htmlFor="phone-number">Phone number</Label>
            <Input
              className="max-w-xs mx-auto"
              id="phone-number"
              placeholder="Enter the phone number"
              onChange={(e) => phoneNumberChangeHandler(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-center">
            <Button onClick={submitHandler} className="mx-auto">Start chat</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
