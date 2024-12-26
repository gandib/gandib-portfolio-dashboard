import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createSkill,
  deleteSkill,
  updateSkill,
} from "../services/SkillService";

export const useCreateSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Skill"],
    mutationFn: async (skillData) => await createSkill(skillData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (skillData) => await updateSkill(skillData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["Skill"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (skillData) => await deleteSkill(skillData),

    onSuccess(data, skillId, context) {
      toast.success(data.message);

      // Update cache for the user's recipes directly
      queryClient.setQueryData(["Skill"], (oldData: any) => {
        if (!oldData) return;

        // Filter out the deleted recipe by ID
        const updatedSkills = oldData?.result.filter(
          (recipe: any) => recipe._id !== skillId
        );

        // Return updated data
        return {
          ...oldData,
          result: updatedSkills, // Update the result array
        };
      });
    },

    onError(error, skillId, context) {
      toast.error(error.message);
    },
  });
};
