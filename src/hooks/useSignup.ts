import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { SignupFormSchema } from "@/schema/SignupFormSchema";
import { account, ID } from "@/lib/appwrite";
import { toast } from "sonner";
import { useNavigate } from "react-router";
export const useSignup = () => {
  const navigate = useNavigate();
  const userId = ID.unique();

  return useMutation({
    mutationFn: async (data: z.infer<typeof SignupFormSchema>) => {
      await account.create({
        userId: userId,
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const response = await account.createEmailToken({
        userId: userId,
        email: data.email,
      });

      return response;
    },
    onSuccess: (response) => {
      toast.info("Please verify your email.");
      navigate(`/auth/verify-email?userId=${response.userId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
