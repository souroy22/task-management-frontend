import { Box } from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { IconType } from "react-icons";
import "./style.css";
import { useState } from "react";

type PropTypes = {
  type: "email" | "text" | "password" | "number";
  placeholder: string;
  name: string;
  errors: any;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  register: any;
  StartIcon?: IconType | null;
  EndIcon?: IconType | null;
  EndIconClick?: IconType | null;
};

const TextInput = ({
  type = "text",
  placeholder,
  name,
  errors,
  required = false,
  minLength,
  maxLength,
  register,
  StartIcon = null,
  EndIcon = null,
  EndIconClick = null,
}: PropTypes) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const capitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const formValidations = () => {
    const validations: any = {};
    if (required) {
      validations["required"] = "This field is required";
    }
    if (minLength) {
      validations["minLength"] = {
        value: minLength,
        message: `${capitalize(
          name
        )} should contain atleast ${minLength} characters`,
      };
    }
    if (maxLength) {
      validations["maxLength"] = {
        value: maxLength,
        message: `${capitalize(
          name
        )} should contain max ${maxLength} characters`,
      };
    }
    if (type === "email") {
      validations["pattern"] = {
        value:
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Enter a valid email address",
      };
    }
    return validations;
  };

  return (
    <>
      <Box className={`input-field ${EndIcon ? "with-end-icon" : ""}`}>
        {StartIcon && (
          <Box className="start-icon">
            <StartIcon />
          </Box>
        )}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={`${placeholder}${required ? "*" : ""}`}
          autoComplete="false"
          {...register(name, formValidations())}
        />
        {EndIcon && EndIconClick && (
          <Box className="end-icon">
            {!showPassword ? (
              <EndIcon onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <EndIconClick onClick={() => setShowPassword(!showPassword)} />
            )}
          </Box>
        )}
      </Box>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="error-message">{message}</span>
        )}
      />
    </>
  );
};

export default TextInput;
