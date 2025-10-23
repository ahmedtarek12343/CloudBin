import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/drive/Home";
import { MyDrive } from "@/pages/drive/FolderPreview/MyDrive";
import { RecentFiles } from "@/pages/drive/FolderPreview/RecentFiles";
import { RootError } from "@/pages/error/Root";
import { createBrowserRouter } from "react-router";
import { driveActions } from "./actions/driveAction";
import { driveFolderLoader } from "./loader/folderLoader";
import { FolderPreview } from "@/pages/drive/FolderPreview/FolderPreview";

export const router = createBrowserRouter([
  {
    path: "/", // layout with header
    ErrorBoundary: RootError,
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Signup,
      },
      {
        path: "verify-email",
        Component: VerifyEmail,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "/drive",
    Component: AppLayout,
    action: driveActions,
    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "my-drive",
        Component: MyDrive,
      },
      {
        path: "recent",
        Component: RecentFiles,
      },
      {
        path: "folders/:folderName",
        Component: FolderPreview,
        loader: driveFolderLoader,
      },
    ],
  },
]);
