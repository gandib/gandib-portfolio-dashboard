import { IInput } from "@/src/types";
import { Textarea } from "@nextui-org/react";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {}

const ESTextarea = ({
  name,
  label,
  varient = "bordered",
  disabled,
  value,
  onChange,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={varient}
      value={currentValue || value || ""}
      disabled={disabled}
      // onChange={onChange!}
    />
  );
};

export default ESTextarea;
