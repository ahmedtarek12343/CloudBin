import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordFormSchema } from "@/schema/ForgotPasswordFormSchema";
import z from "zod";
import { account } from "@/lib/appwrite";
import { toast } from "sonner";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
      const response = await account.createRecovery({
        email: data.email,
        url: `${window.location.origin}/auth/reset-password`,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email");
    },
    onError: () => {
      toast.error("Failed to send password reset instructions");
    },
  });
};
