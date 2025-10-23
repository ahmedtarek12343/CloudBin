import { toast } from "sonner";
import { useCallback } from "react";
import { useNavigate } from "react-router";

import { account } from "@/lib/appwrite";

import { Button } from "./ui/button";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      navigate("/", { viewTransition: true });
      toast.success("Signed out successfully!");
    } catch (err) {
      toast.error("Failed to sign out!");
    }
  }, []);

  return (
    <Button color="secondary" onClick={handleLogout}>
      Sign out
    </Button>
  );
};
