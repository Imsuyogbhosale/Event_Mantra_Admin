import PropTypes from "prop-types";
import React from "react";
import DashboardCard from "../../Component/Common/DashboardCard";
import { FaChartBar } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { LiaIdCardSolid } from "react-icons/lia";
import { CiVideoOn } from "react-icons/ci";
import { MdOutlineVideoFile } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import { FaSellsy } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { FaImages } from "react-icons/fa6";
import { LiaUsersSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardData = [
    {
      label: "Categories",
      count: 12,
      icon: FaShoppingBag,
      color: "bg-sky-400",
      link: "categories",
    },
    {
      label: "Terms & Condition",
      count: 12,
      icon: FaChartBar,
      color: "bg-green-500",
      link: "termsCondition",
    },
    {
      label: "Vendors",
      count: 12,
      icon: FaUsers,
      color: "bg-[#ff851b]",
      link: "vendors",
    },
    {
      label: "Subscription Plan",
      count: 12,
      icon: FaReceipt,
      color: "bg-[#605ca8]",
      link: "subscriptionPlan",
    },
    {
      label: "Rates",
      count: 12,
      icon: FaRegStar,
      color: "bg-[#f39c12]",
      link: "rating",
    },
    {
      label: "Wedding Cards",
      count: 12,
      icon: LiaIdCardSolid,
      color: "bg-[#0073b7]",
      link: "weddingCards",
    },
    {
      label: "Video Invitation",
      count: 12,
      icon: CiVideoOn,
      color: "bg-[#111]",
      link: "videoInvites",
    },
    {
      label: "Video Requests",
      count: 12,
      icon: MdOutlineVideoFile,
      color: "bg-[#00a65a]",
      link: "videoRequests",
    },
    {
      label: "Top Trending",
      count: 12,
      icon: IoTrendingUp,
      color: "bg-[#dd4b39]",
      link: "topTrending",
    },
    {
      label: "Top Selling",
      count: 12,
      icon: FaSellsy,
      color: "bg-[#00c0ef]",
      link: "topSelling",
    },
    {
      label: "Contact Us",
      count: 12,
      icon: GrContactInfo,
      color: "bg-[#ff851b]",
      link: "contactUs",
    },
    {
      label: "Home Banner",
      count: 12,
      icon: FaImages,
      color: "bg-[#dd4b39]",
      link: "termsCondition",
    },
    {
      label: "Total Users",
      count: 12,
      icon: LiaUsersSolid,
      color: "bg-[#0073b7]",
      link: "termsCondition",
    },
  ];
  return (
    <div className="flex flex-wrap justify-between gap-y-14">
      {dashboardData?.map((val, index) => (
        <DashboardCard
          key={index}
          count={val?.count}
          label={val?.label}
          icon={val?.icon}
          color={val?.color}
          onClick={() => navigate(`/${val?.link}`)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
Dashboard.propTypes = {
  setFeature: PropTypes.func,
};
