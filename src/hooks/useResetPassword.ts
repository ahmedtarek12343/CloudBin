import { useMutation } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { ResetPasswordFormSchema } from "@/schema/ResetPasswordFormSchema";
import { account } from "@/lib/appwrite";
import z from "zod";

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: z.infer<typeof ResetPasswordFormSchema>) => {
      if (!userId || !secret) {
        throw new Error("Missing userId or secret");
      }
      const response = await account.updateRecovery({
        userId: userId,
        secret: secret,
        password: data.password,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/auth/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
};
