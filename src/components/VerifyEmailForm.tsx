import { useState } from "react";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOTP } from "@/hooks/useVerifyOTP";
import { toast } from "sonner";

export const VerifyEmailForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { mutate: verifyOtp, isPending } = useVerifyOTP();
  const [otp, setOtp] = useState<string>("");

  const handleVerify = () => {
    if (!userId) {
      toast.error("User ID not found");
      return;
    }
    verifyOtp({ userId, otpCode: otp });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify your email</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 place-items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              type="button"
              className="w-full"
              onClick={handleVerify}
              disabled={isPending || !userId}
            >
              {isPending ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailForm;
