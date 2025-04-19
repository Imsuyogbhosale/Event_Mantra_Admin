import React from "react";
import CategoryTable from "../../Component/Common/CategoryFormTable";
import { subscriptionFormData } from "../../const/form";

const SubscriptionPlan = () => {
  return <div><CategoryTable formData={subscriptionFormData}/></div>;
};

export default SubscriptionPlan;
