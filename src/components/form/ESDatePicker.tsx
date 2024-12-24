import { IInput } from "@/src/types";
import { DatePicker } from "@nextui-org/react";
import { Controller } from "react-hook-form";

interface IProps extends IInput {}

const ESDatePicker = ({ label, name, varient = "bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          variant={varient}
          {...fields}
        />
      )}
    />
  );
};

export default ESDatePicker;
