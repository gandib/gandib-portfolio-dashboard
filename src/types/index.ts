import { ChangeEventHandler, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  varient?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
  createdAt: string;
  updatedAt: string;
}
