import React from "react";
import { IconProps } from "./Icons.types";

const Plus = ({ color, height = 18, width = 18 }: IconProps) => (
  <svg height={height} viewBox="0 0 24 24" width={width}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default Plus;
