import * as yup from "yup";

export const userAuthShema = yup.object().shape({
  userEmail: yup.string().required("Required field").email("Invalid email"),
  userPassword: yup.string().required("Required field").min(6),
});

export const userRegistrationSheme = yup.object().shape({
  userName: yup.string().required(),
  userEmail: yup.string().required("Required field").email("Invalid email"),
  userPassword: yup.string().required("Required field").min(6),
});
