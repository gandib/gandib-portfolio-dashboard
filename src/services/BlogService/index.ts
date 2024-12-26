"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { queryParams } from "@/src/types";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBlog = async (blogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/blog/create-blog`, blogData);
    revalidateTag("Blog");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllBlogs = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/blog?${params.toString()}`;
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

    // Ensure data structure is correct
    if (!data || !data?.data?.result) {
      throw new Error("Invalid data format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    throw error;
  }
};

export const getSingleBlog = async (blogId: string) => {
  let fetchOptions = {};
  const token = (await cookies()).get("accessToken")?.value;

  fetchOptions = {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${envConfig.baseApi}/blog/${blogId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

export const updateBlog = async (blogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/blog/${blogData.id}`,
      blogData.data
    );
    revalidateTag("Blog");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteBlog = async (blogData: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blog/${blogData}`);
    revalidateTag("Blog");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
