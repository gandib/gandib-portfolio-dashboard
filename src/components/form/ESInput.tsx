"use client";

import { IInput } from "@/src/types";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

const ESInput = ({
  varient = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  onChange,
  value,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={
        errors[name]?.message ? (errors[name]?.message as string) : ""
      }
      isInvalid={!!errors[name]}
      variant={varient}
      size={size}
      required={required}
      type={type}
      label={label}
      onChange={onChange!}
      value={value}
    />
  );
};

export default ESInput;
