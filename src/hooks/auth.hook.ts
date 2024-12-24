import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  forgetPassword,
  loginUser,
  recoverPassword,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserlogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useRecoverPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await recoverPassword(userData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
