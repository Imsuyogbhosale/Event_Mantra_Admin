import PropTypes from "prop-types";
import React from "react";

const DashboardCard = ({
  count,
  label,
  icon: Icon,
  color = "sky",
  onClick = () => {},
}) => {
  return (
    <div
      className={`${color} text-white rounded-md shadow-md w-64 overflow-hidden `}
      onClick={onClick}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center p-4 group">
        <div>
          <h2 className="text-2xl font-bold">{count}</h2>
          <p className="text-sm">{label}</p>
        </div>
        <div className="transform transition-transform duration-300 group-hover:scale-125 text-white/40 text-5xl">
          <Icon />
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`bg-${color}-600/30 px-4 py-2 flex items-center justify-between hover:bg-${color}-600/40 cursor-pointer transition`}
      >
        <span className="text-sm">More info</span>
        <span className="text-white">→</span>
      </div>
    </div>
  );
};

export default DashboardCard;
DashboardCard.propTypes = {
  count: PropTypes.number,
  label: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
