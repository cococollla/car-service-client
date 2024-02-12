import * as yup from "yup";

export const userAuthShema = yup.object().shape({
  userEmail: yup.string().required("Required field").email("Invalid email"),
  userPassword: yup.string().required("Required field").min(6),
});

export const userRegistrationSheme = yup.object().shape({
  userName: yup
    .string()
    .required("Please enter the name")
    .trim("There can be no gaps in this value"),
  userEmail: yup
    .string()
    .required("Please enter the email")
    .email("Invalid email")
    .trim("There can be no gaps in this value"),
  userPassword: yup
    .string()
    .required("Please enter the password")
    .min(6, "The minimum number of characters is 6")
    .trim("There can be no gaps in this value"),
});
