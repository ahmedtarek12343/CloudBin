import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TermsOfService() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-primary transition underline-offset-4 hover:underline cursor-pointer">
          Terms of Service
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Terms Of Service</DialogTitle>
          <DialogDescription>Make Sure you read it all.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2 max-h-90 overflow-auto scrollbar-none border-x-2 border-primary px-5">
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              quisquam perspiciatis delectus qui. Odio quas necessitatibus omnis
              perspiciatis corporis impedit autem fugiat quae ex. Hic possimus
              quas itaque numquam voluptate voluptatibus ullam ratione quos ea!
              Recusandae iusto quidem cupiditate libero blanditiis voluptatem
              dolorum repellat, eum ipsa, accusamus maiores optio dolorem
              consequuntur expedita tempora deserunt delectus esse consectetur
              aliquam maxime iste labore soluta nemo quae? Quam earum,
              reprehenderit quos ipsam sed veniam aperiam saepe a nulla incidunt
              doloremque minus consequuntur iure accusantium sint quis. Rerum
              quaerat quis eius repudiandae impedit reprehenderit quibusdam est
              nostrum, animi cupiditate quo magni omnis explicabo ad! Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Ad quisquam
              perspiciatis delectus qui. Odio quas necessitatibus omnis
              perspiciatis corporis impedit autem fugiat quae ex. Hic possimus
              quas itaque numquam voluptate voluptatibus ullam ratione quos ea!
              Recusandae iusto quidem cupiditate libero blanditiis voluptatem
              dolorum repellat, eum ipsa, accusamus maiores optio dolorem
              consequuntur expedita tempora deserunt delectus esse consectetur
              aliquam maxime iste labore soluta nemo quae? Quam earum,
              reprehenderit quos ipsam sed veniam aperiam saepe a nulla incidunt
              doloremque minus consequuntur iure accusantium sint quis. Rerum
              quaerat quis eius repudiandae impedit reprehenderit quibusdam est
              nostrum, animi cupiditate quo magni omnis explicabo ad!
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
