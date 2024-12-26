"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data?.success) {
      (await cookies()).set("accessToken", data?.token, {
        maxAge: 2592000,
        secure: true,
        sameSite: "none",
      });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );
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

export const changePassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
    );

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const recoverPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      userData.data,
      {
        headers: {
          Authorization: `${userData.token}`,
        },
      }
    );
    if (data?.success) {
      (await cookies()).set("accessToken", data?.token, { maxAge: 604800 });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const logout = async () => {
  try {
    const cookies = require("next/headers").cookies();
    await cookies.delete("accessToken");

    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false };
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken: IUser | null = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      name: decodedToken?.name,
      email: decodedToken?.email,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};
