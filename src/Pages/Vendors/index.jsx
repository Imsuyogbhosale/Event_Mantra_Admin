import React from "react";
import { vendorFormBodyData, vendorFormHeadData } from "../../const/form";
import { DataTable } from "../../Component/DataTable";

const VendorTable = () => {
  return (
    <>
      <DataTable
        data={vendorFormBodyData}
        column={vendorFormHeadData}
        showSearch
        showRowsPerPage
        showPagination
      />{" "}
    </>
  );
};

export default VendorTable;
