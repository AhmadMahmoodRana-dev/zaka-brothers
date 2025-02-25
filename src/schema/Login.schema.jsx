import * as Yup from "yup";

const validationSchema = Yup.object({
  userName: Yup.string().required("UserName is required"),
  password: Yup.string()
    .min(1, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default validationSchema;
