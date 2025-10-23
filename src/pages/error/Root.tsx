import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const RootError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center bg-background py-16 md:items-center md:py-24">
      <div className="mx-auto max-w-container grow px-4 md:px-10">
        <div className="w-full max-w-3xl space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <div className="grid gap-3">
              <span className="font-semibold text-primary">404 - Error</span>
              <h1 className="text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
                We can't find that page
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Sorry, the page you are looking for doesn&apos;t exist. or has
                been moved.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
                <ArrowLeftIcon className="text-muted-foreground " />
                Go Back
              </Button>
              <Button size="lg" asChild>
                <Link to="/drive/home" viewTransition>
                  Take me home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
