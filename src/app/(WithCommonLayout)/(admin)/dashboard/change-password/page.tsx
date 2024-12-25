"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import { useChangePassword } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/src/components/UI/Loading";

export default function ChangePassword() {
  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useChangePassword();
  const router = useRouter();

  const onSubmit = (data: FieldValues) => {
    const userData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    handleChangePassword(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess, router]);

  if (isPending) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex mt-6 w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Update Password</h3>
      <div className="w-full md:w-[80%]">
        <ESForm onSubmit={onSubmit}>
          <div className="py-3">
            <ESInput
              name="oldPassword"
              type="password"
              label="Old Password"
              size="sm"
            />
          </div>
          <div className="py-3">
            <ESInput
              name="newPassword"
              type="password"
              label="New Password"
              size="sm"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Update
          </Button>
        </ESForm>
      </div>
    </div>
  );
}
