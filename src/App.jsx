import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// alert dialog component
const AlertDialogComponent = (props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="mx-auto">Start chat</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Please verify the country code and number are correct
          </AlertDialogTitle>
          <AlertDialogDescription>
            Clicking continue will open a new tab with the WhatsApp chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>I always mess up!!!</AlertDialogCancel>
          <AlertDialogAction onClick={props.submitHandler}>
            Yes, I&apos;m not an idiot!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// form component
const FormComponent = (props) => {
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
              onChange={(e) => props.countryCodeChangeHandler(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-center">
            <Label htmlFor="phone-number">Phone number</Label>
            <Input
              className="max-w-xs mx-auto"
              id="phone-number"
              placeholder="Enter the phone number"
              onChange={(e) => props.phoneNumberChangeHandler(e.target.value)}
            />
          </div>
          <div className="space-y-2 text-center">
            <AlertDialogComponent submitHandler={props.submitHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

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
    console.log("Anand: url", url);
    window.open(url, "_blank");
  }

  return (
    <>
      <FormComponent
        countryCodeChangeHandler={countryCodeChangeHandler}
        phoneNumberChangeHandler={phoneNumberChangeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default App;
