import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const HeaderMoreInfoButton = () => {
  return (
    <button aria-label="options menu" className=" flex items-center py-2.5 px-2.5">
      <BsThreeDotsVertical fontSize={25} fill="#828fa3" />
    </button>
  );
};

export default HeaderMoreInfoButton;
