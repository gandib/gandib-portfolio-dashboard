"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user", userData);

    // if (data?.success) {
    //   cookies().set("accessToken", data?.token, { maxAge: 604800 });
    // }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
