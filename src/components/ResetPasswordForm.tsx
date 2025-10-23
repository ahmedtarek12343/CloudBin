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

import { ArrowLeftIcon, Eye, EyeClosed, Loader2Icon } from "lucide-react";
import { ResetPasswordFormSchema } from "@/schema/ResetPasswordFormSchema";
import type { SubmitHandler } from "react-hook-form";
import { useResetPassword } from "@/hooks/useResetPassword";
export const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useResetPassword();
  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordFormSchema>> =
    useCallback((data) => {
      mutate(data);
    }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Set new password</CardTitle>
          <CardDescription>
            Your new password must be different from previously used passwords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Set new password"
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...field}
                          />
                          {showConfirmPassword ? (
                            <EyeClosed
                              size={18}
                              onClick={() => setShowConfirmPassword(false)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            />
                          ) : (
                            <Eye
                              size={18}
                              onClick={() => setShowConfirmPassword(true)}
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
                  Reset password
                </Button>
              </div>
              <div className="text-center text-sm">
                <Button variant="link" asChild>
                  <Link
                    to="/auth/login"
                    className="underline underline-offset-4"
                    viewTransition
                  >
                    <ArrowLeftIcon />
                    Back to login
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
