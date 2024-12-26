import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "../services/UserService";
import next from "next";
import { createBlog, deleteBlog, updateBlog } from "../services/BlogService";

export const useCreateBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Blog"],
    mutationFn: async (blogData) => await createBlog(blogData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (blogData) => await updateBlog(blogData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["Blog"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteBlog = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["Blog"],
    mutationFn: async (blogData) => await deleteBlog(blogData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

// export const useDeleteBlog = () => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, string>({
//     mutationFn: async (blogData) => await deleteBlog(blogData),

//     onSuccess(data, blogId, context) {
//       toast.success(data.message);

//       // Update cache for the user's recipes directly
//       queryClient.setQueryData(["Blog"], (oldData: any) => {
//         if (!oldData) return;

//         // Filter out the deleted recipe by ID
//         const updatedBlogs = oldData.result.filter(
//           (recipe: any) => recipe._id !== blogId
//         );

//         // Return updated data
//         return {
//           ...oldData,
//           result: updatedBlogs, // Update the result array
//         };
//       });
//     },

//     onError(error, blogId, context) {
//       toast.error(error.message);
//     },
//   });
// };
