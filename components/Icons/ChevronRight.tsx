import React from "react";
import { IconProps } from "./Icons.types";

const ChevronRight = ({ color, height = 18, width = 18 }: IconProps) => (
  <svg height={height} viewBox="0 0 18 18" width={width}>
    <path
      d="M4.4 15.1l1.3 1.3L13.1 9 5.7 1.6 4.4 2.9 10.5 9l-6.1 6.1z"
      fill={color}
    />
    <path d="M0 0h18v18H0V0z" fill="none" />
  </svg>
);

export default ChevronRight;
