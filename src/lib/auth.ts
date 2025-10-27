import { account, OAuthProvider } from "./appwrite";

export const handleOAuthLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: `${window.location.origin}/home`,
  });
};
