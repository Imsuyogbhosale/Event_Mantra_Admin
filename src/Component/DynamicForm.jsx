import PropTypes from "prop-types";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, DialogActions, DialogContent } from "@mui/material";
import ReusableFormField from "./ReusableFormField";

const buildInitialValues = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] =
      field.initialValue ??
      (field.type === "checkbox" || field.type === "multiselect"
        ? []
        : field.type === "file"
          ? null
          : "");
    return acc;
  }, {});

const buildValidationSchema = (fields) =>
  Yup.object(
    fields.reduce((acc, field) => {
      if (field.validation) acc[field.name] = field.validation;
      return acc;
    }, {}),
  );

const DynamicForm = ({
  fields,
  onSubmit,
  initialValues: customInitialValues,
  submitButtonText = "Submit",
  className = {},
  onClose = () => {},
}) => {
  const initialValues = customInitialValues || buildInitialValues(fields);
  const validationSchema = buildValidationSchema(fields);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form style={className}>
          <DialogContent dividers>
            {fields.map((field) => (
              <Box mb={2} key={field.name} width={field?.width}>
                <ReusableFormField {...field} />
              </Box>
            ))}
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="inherit" size="small">
              Close
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              {submitButtonText}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
DynamicForm.propTypes = {
  fields: PropTypes.array,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.array,
  submitButtonText: PropTypes.string,
  className: PropTypes.object,
  onClose: PropTypes.func,
};

// pass field value like below

// const fieldConfig = [
//   {
//     name: "eventDate",
//     label: "Event Date",
//     type: "date",
//     validation: Yup.date()
//       .required("Date is required")
//       .typeError("Invalid date")
//       .max(new Date("12/12/2050"), "Date cannot be in the future"),
//   },
//   {
//     name: "name",
//     label: "Full Name",
//     type: "text",
//     validation: Yup.string().required("Name is required"),
//   },
//   {
//     name: "icon",
//     label: "Upload Icon",
//     type: "file",
//     validation: Yup.mixed().required("Icon is required"),
//   },
//   {
//     name: "category",
//     label: "Category",
//     type: "select",
//     options: ["Wedding", "Birthday", "Anniversary"],
//     validation: Yup.string().required("Category is required"),
//   },
//   {
//     name: "subCategory",
//     label: "Sub Category",
//     type: "multiselect",
//     options: [
//       "Fabrication Decoration",
//       "Wedding Decoration",
//       "Birthday Decoration",
//     ],
//     validation: Yup.array().min(1, "Choose at least one"),
//   },
//   {
//     name: "preferences",
//     label: "Notification Preferences",
//     type: "checkbox",
//     options: [
//       { label: "Email", value: "email" },
//       { label: "SMS", value: "sms" },
//     ],
//     validation: Yup.array().min(1, "Select at least one"),
//   },
//   {
//     name: "plan",
//     label: "Subscription Plan",
//     type: "radio",
//     options: [
//       { label: "Free", value: "free" },
//       { label: "Premium", value: "premium" },
//     ],
//     validation: Yup.string().required("Select one"),
//   },
// ];

//pass initialValues like below

// const initialValues = {
//   name: "Jane Decorator",
//   category: "Wedding",
//   subCategory: ["Wedding Decoration"],
//   preferences: ["email"],
//   plan: "premium",
//   icon: {
//     name: "logo.png",
//     previewUrl: "https://example.com/uploads/logo.png",
//   },
// };
