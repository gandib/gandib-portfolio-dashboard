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
import {
  createProject,
  deleteProject,
  updateProject,
} from "../services/ProjectService";

export const useCreateProject = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Project"],
    mutationFn: async (projectData) => await createProject(projectData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (projectData) => await updateProject(projectData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["Project"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (projectData) => await deleteProject(projectData),

    onSuccess(data, projectId, context) {
      toast.success(data.message);

      // Update cache for the user's recipes directly
      queryClient.setQueryData(["Project"], (oldData: any) => {
        if (!oldData) return;

        // Filter out the deleted recipe by ID
        const updatedProjects = oldData.result.filter(
          (recipe: any) => recipe._id !== projectId
        );

        // Return updated data
        return {
          ...oldData,
          result: updatedProjects, // Update the result array
        };
      });
    },

    onError(error, projectId, context) {
      toast.error(error.message);
    },
  });
};
