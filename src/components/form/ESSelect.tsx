import { IInput } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const ESSelect = ({
  options,
  name,
  label,
  varient = "bordered",
  disabled,
  required = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      label={label}
      className="min-w-full sm:min-w-[225px]"
      variant={varient}
      isDisabled={disabled}
      required={required}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default ESSelect;
