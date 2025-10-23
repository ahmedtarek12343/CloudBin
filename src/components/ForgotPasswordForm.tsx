import { useCallback } from "react";
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

import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { ForgotPasswordFormSchema } from "@/schema/ForgotPasswordFormSchema";
import type { SubmitHandler } from "react-hook-form";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { TermsOfService } from "./TermsOfService";
import { PrivacyPolicy } from "./PrivacyPolicy";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useForgotPassword();
  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordFormSchema>> =
    useCallback((data) => {
      mutate(data);
    }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password?</CardTitle>
          <CardDescription>
            No worries, we'll send you reset instructions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && <Loader2Icon className="mr-2 animate-spin" />}
                  Send Reset Link
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <TermsOfService /> and{" "}
        <PrivacyPolicy />
      </div>
    </div>
  );
};
