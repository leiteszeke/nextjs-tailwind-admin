import React from "react";
import { IconProps } from "./Icons.types";

const ChevronLeft = ({ color, height = 18, width = 18 }: IconProps) => (
  <svg height={height} viewBox="0 0 18 18" width={width}>
    <path
      d="M13.1 2.9l-1.3-1.3L4.4 9l7.4 7.4 1.3-1.3L7 9l6.1-6.1z"
      fill={color}
    />
    <path d="M0 0h18v18H0V0z" fill="none" />
  </svg>
);

export default ChevronLeft;
