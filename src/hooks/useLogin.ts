import { useMutation } from "@tanstack/react-query";
import { loginFormSchema } from "@/schema/LoginFormSchema";
import { z } from "zod";
import { useNavigate } from "react-router";
import { account } from "@/lib/appwrite";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
      const session = await account.createEmailPasswordSession({
        email: data.email,
        password: data.password,
      });
      return session;
    },
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
