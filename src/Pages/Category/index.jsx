import React, { useState } from "react";
import Swal from "sweetalert2";
import { CategoryFormBodyData, CategoryFormHeadData } from "../../const/form";
import { DataTable } from "../../Component/DataTable";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { CgArrowsExchange } from "react-icons/cg";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete } from "@mui/material";

export default function Category() {
  // Dialog open state
  const [open, setOpen] = useState(false);
  const [openChangePosition, setOpenChangePosition] = useState(false);
  const handleClose = () => setOpen(false);

  // initial form values
  const initialFormValues = {
    icon: null,
    category: "",
    subCategory: [],
  };

  const handleIconChange = (e) => {
    const file = e.currentTarget.files[0];
    formikUpdate.setFieldValue("icon", file);
  };

  const handleClickDelete = async () => {
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "This category is used in category form and subscription data, do you still want to delete the category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    console.log(res.isConfirmed, "res");
  };
  const handleClickUpdate = () => {};
  // const handleChangePosition = (id) => {};
  const renderActionButton = (id) => {
    return (
      <div className=" flex flex-col gap-2">
        <div className="flex gap-2 ">
          <RxUpdate
            className="h-5 w-5 text-blue-500 cursor-pointer"
            onClick={() => handleClickUpdate(id)}
          />
          <MdDelete
            className="h-5 w-5 text-red-500 cursor-pointer"
            onClick={() => handleClickDelete(id)}
          />
        </div>
        <CgArrowsExchange
          className="h-5 w-5 text-blue-700 cursor-pointer"
          onClick={() => setOpenChangePosition(true)}
        />
      </div>
    );
  };
  const updatedCategoryFormBodyData = CategoryFormBodyData?.map(
    (val, index) => ({
      ...val,
      Action: renderActionButton(index),
    }),
  );

  const formikUpdate = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      icon: Yup.mixed()
        .required("Category Icon is required")
        .test("fileType", "Unsupported File Format", (value) => {
          return (
            value &&
            ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"].includes(
              value.type,
            )
          );
        }),
      category: Yup.string().required("Category is required"),
      subCategory: Yup.array()
        .of(Yup.string())
        .min(1, "At least one sub-category is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      handleClose();
    },
  });

  const formikChangePosition = useFormik({
    initialValues: { changePosition: "" },
    validationSchema: Yup.object({
      changePosition: Yup.string().required("changePosition is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      setOpenChangePosition(false);
    },
  });
  return (
    <>
      {/* Table */}
      <DataTable
        data={updatedCategoryFormBodyData}
        column={CategoryFormHeadData}
        showSearch
        showRowsPerPage
        showPagination
        groupByCategory
        onClickAddButton={() => setOpen(true)}
      />

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <form onSubmit={formikUpdate.handleSubmit}>
          <DialogContent dividers>
            {/* Icon Upload */}
            <Box mb={2}>
              <input
                id="icon-upload"
                name="icon"
                type="file"
                accept="image/*"
                hidden
                onChange={handleIconChange}
              />
              <Button
                variant="outlined"
                onClick={() => document.getElementById("icon-upload").click()}
              >
                Choose File
              </Button>
              {formikUpdate.values.icon && (
                <Typography variant="body2" mt={1}>
                  Selected File: {formikUpdate.values.icon.name}
                </Typography>
              )}
              {formikUpdate.touched.icon && formikUpdate.errors.icon && (
                <Typography color="error" variant="body2">
                  {formikUpdate.errors.icon}
                </Typography>
              )}
            </Box>

            {/* Category Field */}
            <Box mb={2}>
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                size="small"
                value={formikUpdate.values.category}
                onChange={formikUpdate.handleChange}
                onBlur={formikUpdate.handleBlur}
                error={
                  formikUpdate.touched.category &&
                  Boolean(formikUpdate.errors.category)
                }
                helperText={
                  formikUpdate.touched.category && formikUpdate.errors.category
                }
              />
            </Box>

            {/* Sub Category */}
            <Box mb={2}>
              <Autocomplete
                multiple
                id="subCategory"
                size="small"
                options={[
                  "Fabrication Decoration",
                  "Wedding Decoration",
                  "Birthday Decoration",
                  "Baby shower Decoration",
                  "Naming ceremony Decoration",
                  "Anniversary Decoration",
                ]}
                value={formikUpdate.values.subCategory}
                onChange={(e, value) =>
                  formikUpdate.setFieldValue("subCategory", value)
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Sub Category"
                    placeholder="Select sub-categories"
                    error={
                      formikUpdate.touched.subCategory &&
                      Boolean(formikUpdate.errors.subCategory)
                    }
                    helperText={
                      formikUpdate.touched.subCategory &&
                      formikUpdate.errors.subCategory
                    }
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit" size="small">
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Change Position Modal */}
      <Dialog
        open={openChangePosition}
        onClose={() => setOpenChangePosition(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Position</DialogTitle>
        <form onSubmit={formikChangePosition.handleSubmit}>
          <DialogContent dividers>
            <Box mb={2}>
              <TextField
                fullWidth
                id="changePosition"
                name="changePosition"
                label="Change Position"
                size="small"
                value={formikChangePosition.values.changePosition}
                onChange={formikChangePosition.handleChange}
                onBlur={formikChangePosition.handleBlur}
                error={
                  formikChangePosition.touched.changePosition &&
                  Boolean(formikChangePosition.errors.changePosition)
                }
                helperText={
                  formikChangePosition.touched.changePosition &&
                  formikChangePosition.errors.changePosition
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit" size="small">
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
