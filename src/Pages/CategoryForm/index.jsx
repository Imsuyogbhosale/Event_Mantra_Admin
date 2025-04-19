import React from "react";
import CategoryTable from "../../Component/Common/CategoryFormTable";
import { categoryFormdata } from "../../const/form";

const CategoryForm = () => {
  return <div><CategoryTable formData={categoryFormdata}/></div>;
};

export default CategoryForm;
