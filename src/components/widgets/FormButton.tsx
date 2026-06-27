import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type FormButtonProps = ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingText?: string;
};

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
  className,
  disabled,
  ...props
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full mt-4 ${className ?? ""}`}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}