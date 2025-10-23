import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { GoogleLogo } from "../../public/assets/logo/google";
import { Eye, EyeClosed, Loader2Icon } from "lucide-react";

import type { SubmitHandler } from "react-hook-form";
import { loginFormSchema } from "@/schema/LoginFormSchema";
import { useLogin } from "../hooks/useLogin";
import { TermsOfService } from "./TermsOfService";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { handleOAuthLogin } from "../lib/auth";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();
  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = useCallback(
    (data) => {
      mutate(data);
    },
    []
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={handleOAuthLogin}
                >
                  <GoogleLogo colorful />
                  Continue with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between item-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/auth/forgot-password"
                          className="text-xs text-muted-foreground transition-all hover:text-primary underline-offset-4 hover:underline"
                          viewTransition
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="tracking-wider"
                            {...field}
                          />
                          {showPassword ? (
                            <EyeClosed
                              size={18}
                              onClick={() => setShowPassword(false)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            />
                          ) : (
                            <Eye
                              size={18}
                              onClick={() => setShowPassword(true)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && <Loader2Icon className="mr-2 animate-spin" />}
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-xs text-muted-foreground transition-all hover:text-primary underline-offset-4 hover:underline"
                  viewTransition
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <TermsOfService /> and{" "}
        <PrivacyPolicy />
      </div>
    </div>
  );
};
