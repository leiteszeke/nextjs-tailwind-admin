export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  ERROR = "error",
  DEFAULT = "default",
}

export enum ButtonIconPosition {
  LEFT = "left",
  RIGHT = "right",
}

export enum ButtonType {
  NORMAL = "normal",
  FLAT = "flat",
  OUTLINE = "outline",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: any;
  iconPosition?: ButtonIconPosition;
  iconSize?: number;
  label: string;
  onClick: () => void;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: ButtonVariant;
};
