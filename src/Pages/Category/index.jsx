import React, { useState } from "react";
import Swal from "sweetalert2";
import { CategoryFormBodyData, CategoryFormHeadData } from "../../const/form";
import { DataTable } from "../../Component/DataTable";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { CgArrowsExchange } from "react-icons/cg";
import DynamicForm from "../../Component/DynamicForm";

import { Dialog, DialogTitle } from "@mui/material";
import * as Yup from "yup";

export default function Category() {
  // Dialog open state
  const [open, setOpen] = useState(false);
  const [openChangePosition, setOpenChangePosition] = useState(false);
  const handleClose = () => setOpen(false);

  const handleClickDelete = async () => {
    //Before deleting show confirmation message
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

  //  handled action button here
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

  const fieldConfigAdd = [
    {
      name: "eventDate",
      label: "Event Date",
      type: "date",
      validation: Yup.date()
        .required("Date is required")
        .typeError("Invalid date")
        .max(new Date("12/12/2050"), "Date cannot be in the future"),
    },
    {
      name: "icon",
      label: "Choose File",
      type: "file",
      validation: Yup.mixed().required("File is required"),
      width: "100%",
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      validation: Yup.string().required("Category is required"),
    },
    {
      name: "subCategory",
      label: "Sub Category",
      type: "multiselect",
      options: [
        "Fabrication Decoration",
        "Wedding Decoration",
        "Birthday Decoration",
        "Baby shower Decoration",
        "Naming ceremony Decoration",
        "Anniversary Decoration",
      ],
      validation: Yup.array().min(1, "Choose at least one"),
    },
  ];

  const fieldConfigChangePosition = [
    {
      name: "changePosition",
      label: "Change Position",
      type: "text",
      validation: Yup.string().required("change Position is required"),
    },
  ];

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };
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
        addButtonName={"Add"}
        onClickAddButton={() => setOpen(true)}
      />

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DynamicForm
          fields={fieldConfigAdd}
          onSubmit={handleSubmit}
          submitButtonText="Submit"
          onClose={() => setOpen(false)}
          // initialValues={initialValues}
        />
      </Dialog>

      {/* Change Position Modal */}
      <Dialog
        open={openChangePosition}
        onClose={() => setOpenChangePosition(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Position</DialogTitle>
        <DynamicForm
          fields={fieldConfigChangePosition}
          onSubmit={(data) => console.log(data, "change position data")}
          submitButtonText="Submit"
          onClose={() => setOpenChangePosition(false)}
        />
      </Dialog>
    </>
  );
}
