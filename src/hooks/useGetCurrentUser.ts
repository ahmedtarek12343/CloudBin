import { useQuery } from "@tanstack/react-query";
import { account } from "@/lib/appwrite";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const currentSession = await account.getSession({ sessionId: "current" });
      const user = await account.get();
      return { currentSession, user };
    },
  });
};
