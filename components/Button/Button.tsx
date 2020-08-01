import React from "react";
import classnames from "classnames";
import { colors } from "tailwindcss/defaultTheme";

import {
  ButtonIconPosition,
  ButtonProps,
  ButtonVariant,
  ButtonType,
} from "./Button.types";
import { ButtonSize } from ".";

const Button = ({
  className,
  disabled = false,
  icon: Icon,
  iconPosition = ButtonIconPosition.LEFT,
  iconSize = 12,
  label,
  onClick,
  size = ButtonSize.MEDIUM,
  type = ButtonType.NORMAL,
  variant,
}: ButtonProps) => {
  const handlePress = () => {
    if (!disabled) {
      onClick();
    }
  };

  const { bgColor, iconColor, textColor } = React.useMemo(() => {
    switch (variant) {
      case ButtonVariant.SUCCESS:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-green-500 hover:bg-green-100"
              : type === ButtonType.FLAT
              ? "hover:bg-green-100"
              : "bg-green-500 hover:bg-green-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.green[500],
          textColor:
            type === ButtonType.NORMAL ? "text-white" : "text-green-500",
        };

      case ButtonVariant.DANGER:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-orange-500 hover:bg-orange-100"
              : type === ButtonType.FLAT
              ? "hover:bg-orange-100"
              : "bg-orange-500 hover:bg-orange-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.orange[500],
          textColor:
            type === ButtonType.NORMAL ? "text-white" : "text-orange-500",
        };

      case ButtonVariant.ERROR:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-red-500 hover:bg-red-100"
              : type === ButtonType.FLAT
              ? "hover:bg-red-100"
              : "bg-red-500 hover:bg-red-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.red[500],
          textColor: type === ButtonType.NORMAL ? "text-white" : "text-red-500",
        };

      case ButtonVariant.PRIMARY:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-blue-500 hover:bg-blue-100"
              : type === ButtonType.FLAT
              ? "hover:bg-blue-100"
              : "bg-blue-500 hover:bg-blue-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.blue[500],
          textColor:
            type === ButtonType.NORMAL ? "text-white" : "text-blue-500",
        };

      case ButtonVariant.SECONDARY:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-indigo-500 hover:bg-indigo-100"
              : type === ButtonType.FLAT
              ? "hover:bg-indigo-100"
              : "bg-indigo-500 hover:bg-indigo-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.indigo[500],
          textColor:
            type === ButtonType.NORMAL ? "text-white" : "text-indigo-500",
        };

      default:
      case ButtonVariant.DEFAULT:
        return {
          bgColor:
            type === ButtonType.OUTLINE
              ? "border border-gray-500 hover:bg-gray-100"
              : type === ButtonType.FLAT
              ? "hover:bg-gray-100"
              : "bg-gray-500 hover:bg-gray-700",
          iconColor:
            type === ButtonType.NORMAL ? colors.white : colors.gray[500],
          textColor:
            type === ButtonType.NORMAL ? "text-white" : "text-gray-500",
        };
    }
  }, [variant, type]);

  const buttonSize = React.useMemo(() => {
    switch (size) {
      case ButtonSize.LARGE:
        return "h-12";
      default:
      case ButtonSize.MEDIUM:
        return "h-10";
      case ButtonSize.SMALL:
        return "h-8";
    }
  }, [size]);

  return (
    <button
      onClick={handlePress}
      className={classnames(
        "border border-transparent font-bold mx-1 rounded inline-flex items-center min-w-28 px-2",
        buttonSize,
        bgColor,
        textColor,
        className
      )}
      disabled={disabled}
    >
      {Icon && iconPosition === ButtonIconPosition.LEFT ? (
        <Icon color={iconColor} height={iconSize} width={iconSize} />
      ) : null}
      <span
        className={classnames("text-sm leading-none text-center w-full", {
          "ml-1": Icon && iconPosition === ButtonIconPosition.LEFT,
          "mr-1": Icon && iconPosition === ButtonIconPosition.RIGHT,
        })}
      >
        {label}
      </span>
      {Icon && iconPosition === ButtonIconPosition.RIGHT ? (
        <Icon color={iconColor} height={iconSize} width={iconSize} />
      ) : null}
    </button>
  );
};

export default Button;
