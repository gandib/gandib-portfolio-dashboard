"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { queryParams } from "@/src/types";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/skill/create-skill`, skillData);
    revalidateTag("Skill");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllSkills = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/skill?${params.toString()}`;
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log(data);

    // Ensure data structure is correct
    if (!data || !data?.data?.result) {
      throw new Error("Invalid data format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Skills:", error);
    throw error;
  }
};

export const getSingleSkill = async (skillId: string) => {
  let fetchOptions = {};
  const token = (await cookies()).get("accessToken")?.value;

  fetchOptions = {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/skill/${skillId}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

export const updateSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/skill/${skillData.id}`,
      skillData.data
    );
    revalidateTag("Skill");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteSkill = async (skillData: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skill/${skillData}`);
    revalidateTag("Skill");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
