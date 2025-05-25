import React, { useState } from "react";
import {
  subscriptionFormBodyData,
  subscriptionFormHeadData,
} from "../../const/form";
import { DataTable } from "../../Component/DataTable";
import { Dialog, DialogTitle } from "@mui/material";
import DynamicForm from "../../Component/DynamicForm";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const SubscriptionPlan = () => {
  const [open, setOpen] = useState(false);

  const fieldConfigAdd = [
    // { name: "eventDate", label: "Event Date", type: "date" },
    {
      name: "title",
      label: "Title",
      type: "text",
      validation: Yup.string().required("Title is required"),
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        "Fabrication Decoration",
        "Wedding Decoration",
        "Birthday Decoration",
        "Baby shower Decoration",
        "Naming ceremony Decoration",
        "Anniversary Decoration",
      ],
      validation: Yup.string().required("Category is required"),
    },

    {
      name: "amount",
      label: "Amount",
      type: "text",
      validation: Yup.number().required("Amount is required"),
    },
    {
      name: "month",
      label: "Month",
      type: "text",
      validation: Yup.number().required("Month is required"),
    },
    {
      name: "planedDescription",
      label: "Planed Description",
      type: "multiselect",
      options: [
        "Fabrication Decoration",
        "Wedding Decoration",
        "Birthday Decoration",
        "Baby shower Decoration",
        "Naming ceremony Decoration",
        "Anniversary Decoration",
      ],
      validation: Yup.array().min(1, "Choose at least one  Planed Description"),
    },
    {
      name: "nonPlanedDescription",
      label: "Non Planed Description",
      type: "multiselect",
      options: [
        "Fabrication Decoration",
        "Wedding Decoration",
        "Birthday Decoration",
        "Baby shower Decoration",
        "Naming ceremony Decoration",
        "Anniversary Decoration",
      ],
      validation: Yup.array().min(
        1,
        "Choose at least one Non Planed Description",
      ),
    },
  ];
  const handleSubmit = (data) => {
    console.log(data, "data");
  };
  const handleClickDelete = async () => {
    //Before deleting show confirmation message
    const res = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    console.log(res.isConfirmed, "res");
  };
  const handleClickUpdate = () => {};

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
      </div>
    );
  };
  const updatedCategoryFormBodyData = subscriptionFormBodyData?.map(
    (val, index) => ({
      ...val,
      fields: val?.fields?.map((val) => ({
        ...val,
        Action: renderActionButton(index),
      })),
    }),
  );
  return (
    <div>
      <DataTable
        data={updatedCategoryFormBodyData}
        column={subscriptionFormHeadData}
        showSearch
        showRowsPerPage
        showPagination
        groupByCategory
        addButtonName={"Add"}
        onClickAddButton={() => setOpen(true)}
      />

      {/* Edit Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Subscription Plan</DialogTitle>
        <DynamicForm
          fields={fieldConfigAdd}
          onSubmit={handleSubmit}
          submitButtonText="Submit"
          onClose={() => setOpen(false)}
          // initialValues={initialValues}
        />
      </Dialog>
    </div>
  );
};

export default SubscriptionPlan;
