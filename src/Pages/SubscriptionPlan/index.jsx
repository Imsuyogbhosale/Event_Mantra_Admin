import React from "react";
import {
  subscriptionFormBodyData,
  subscriptionFormHeadData,
} from "../../const/form";
import { DataTable } from "../../Component/DataTable";

const SubscriptionPlan = () => {
  return (
    <div>
      <DataTable
        data={subscriptionFormBodyData}
        column={subscriptionFormHeadData}
        showSearch
        showRowsPerPage
        showPagination
        groupByCategory
      />
    </div>
  );
};

export default SubscriptionPlan;
