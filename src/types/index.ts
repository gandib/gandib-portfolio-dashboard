import { ChangeEventHandler, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type queryParams = {
  name: string;
  value: boolean | React.Key;
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
  _id: string;
  name: string;
  email: string;
  role: "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  clientLiveLink: string;
  serverLiveLink: string;
  gitClientLink: string;
  gitServerLink: string;
  image: string[];
  tag: string;
  isDeleted: boolean;
  __v: number;
}

export interface IBlog {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  image: string[];
  tag: string;
  isDeleted: boolean;
  __v: number;
}

export interface ISkill {
  _id: string;
  user: IUser;
  name: string;
  logo: string;
  isDeleted: boolean;
  __v: number;
}
