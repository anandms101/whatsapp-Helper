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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CommandList } from "cmdk";

import { ChevronsUpDown } from "lucide-react";

import countryCodes from "../src/data/CountryCodes.json";
import PropTypes from "prop-types";
import NavBar from "./layouts/Navbar";

// alert dialog component
const AlertDialogComponent = (props) => {
  const fieldsValidation = props.validPhone && props.countrySelected;
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!fieldsValidation}>
        <Button disabled={!fieldsValidation} className="mx-auto">
          Start chat
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are the details correct???
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-bold antialiased text-m">
            {props.countrySelected} {props.phoneNumber}
            </span>
            <br />
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

AlertDialogComponent.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  countrySelected: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  validPhone: PropTypes.bool.isRequired,
};

// form component
const FormComponent = (props) => {
  return (
    <>
      <div className="px-4 py-12 space-y-8 md:py-24 md:space-y-12 flex items-center justify-center">
        <div className="container space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold font-heading antialiased capitalize">
              Saves you the trouble of saving a number
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter the country code and phone number below to start a Whatspp chat.
            </p>
          </div>
          <div className="space-y-2 text-center">
            <CountrySearchComponent
              open={props.open}
              setOpen={props.setOpen}
              countrySelected={props.countrySelected}
              setCountrySelected={props.setCountrySelected}
              setCountryDialCode={props.setCountryDialCode}
              countryDialCode={props.countryDialCode}
            />
          </div>
          <div className="space-y-2 text-center">
            <Input
              className="max-w-xs mx-auto"
              id="phone-number"
              placeholder="Phone number without country code"
              onChange={(e) => props.phoneNumberChangeHandler(e.target.value)}
              required
            />
            {!props.validPhone && (
              <span  className="text-s text-red-600">
                Please enter a valid phone number
              </span>
            )}
          </div>
          <div className="space-y-2 text-center ">
            <AlertDialogComponent
              countrySelected={props.countrySelected}
              phoneNumber={props.phoneNumber}
              submitHandler={props.submitHandler}
              validPhone={props.validPhone}
            />
          </div>
        </div>
      </div>
    </>
  );
};

FormComponent.propTypes = {
  countryCodeChangeHandler: PropTypes.func.isRequired,
  phoneNumberChangeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  countrySelected: PropTypes.string.isRequired,
  setCountrySelected: PropTypes.func.isRequired,
  setCountryDialCode: PropTypes.func.isRequired,
  countryDialCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  validPhone: PropTypes.bool.isRequired,
};

// country search component
const CountrySearchComponent = ({
  open,
  setOpen,
  countrySelected,
  setCountrySelected,
  setCountryDialCode,
}) => {
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-80 justify-between"
          >
            {countrySelected
              ? countryCodes.find((country) => country.name === countrySelected)
                  ?.name
              : "Select country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes.map((country) => (
                <CommandList key={country.code}>
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={(currentValue) => {
                      setCountrySelected(
                        currentValue === countrySelected ? "" : currentValue
                      );
                      setOpen(false);
                      setCountryDialCode(country.dial_code);
                    }}
                  >
                    {`${country.dial_code} - ${country.name} (${country.code})`}
                  </CommandItem>
                </CommandList>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

CountrySearchComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  countrySelected: PropTypes.string.isRequired,
  setCountrySelected: PropTypes.func.isRequired,
  setCountryDialCode: PropTypes.func.isRequired,
  countryDialCode: PropTypes.string.isRequired,
};

function App() {
  const [countryDialCode, setCountryDialCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [countrySelected, setCountrySelected] = useState("");

  const [validPhone, setValidPhone] = useState(false);

  function countryCodeChangeHandler(value) {
    setCountryDialCode(value.trim().replace("+", ""));
  }

  function phoneNumberChangeHandler(value) {
    setPhoneNumber(value);
    setValidPhone(validatePhoneNumber(value));
  }

  function validatePhoneNumber(phone) {
    const regex =
      /^(?:(?:\+|00)(\d{1,3})[\s-]?)?(?:\d{3,})[\s-]?\d{3,}[\s-]?\d{2,}[\s-]?\d{2,}$/;
    return regex.test(phone);
  }

  function submitHandler() {
    const url = `https://wa.me/${countryDialCode}${phoneNumber}`;
    console.log("Anand: url", url);
    window.open(url, "_blank");
  }

  return (
    <>
      {/* <ModeToggle /> */}
      <NavBar />
      <FormComponent
        countryCodeChangeHandler={countryCodeChangeHandler}
        phoneNumberChangeHandler={phoneNumberChangeHandler}
        submitHandler={submitHandler}
        open={open}
        setOpen={setOpen}
        countrySelected={countrySelected}
        setCountrySelected={setCountrySelected}
        setCountryDialCode={setCountryDialCode}
        countryDialCode={countryDialCode}
        phoneNumber={phoneNumber}
        validPhone={validPhone}
      />
    </>
  );
}

export default App;
