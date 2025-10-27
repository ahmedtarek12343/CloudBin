import { useMutation } from "@tanstack/react-query";
import { account } from "@/lib/appwrite";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useVerifyOTP = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      userId,
      otpCode,
    }: {
      userId: string;
      otpCode: string;
    }) => {
      const session = await account.createSession({
        userId: userId,
        secret: otpCode,
      });
      return session;
    },
    onSuccess: () => {
      toast.success("Email verified and logged in!");
      navigate("/home");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
