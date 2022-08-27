import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const HeaderMoreInfoButton = () => {
  return (
    <button aria-label="options menu" className="group flex items-center p-2">
      <BsThreeDotsVertical
        fontSize={25}
        fill="#828fa3"
        className="group-hover:fill-black dark:group-hover:fill-white/80"
      />
    </button>
  );
};

export default HeaderMoreInfoButton;
