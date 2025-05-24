import React from "react";
import { categoryFormBodyData, categoryFormHeadData } from "../../const/form";
import { DataTable } from "../../Component/DataTable";

const CategoryForm = () => {
  return (
    <div>
      <DataTable
        data={categoryFormBodyData}
        column={categoryFormHeadData}
        showSearch
        showRowsPerPage
        showPagination
        groupByCategory
      />
    </div>
  );
};

export default CategoryForm;
