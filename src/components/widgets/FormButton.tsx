import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FormButtonProps = ComponentProps<typeof Button> & {
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
};

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
  className,
  disabled,
  type,
  variant = "default",
  size = "default",
  fullWidth = true,
  ...props
}: FormButtonProps) {
  const buttonType = type ?? (props.onClick ? "button" : "submit");
  return (
    <Button
      variant={variant}
      size={size}
      type={buttonType}
      disabled={isLoading || disabled}
      className={cn(
        "rounded-lg font-medium transition-colors",
        "inline-flex items-center justify-center gap-1.5",
        fullWidth ? "w-full" : "w-auto",

        variant === "default" && !className?.includes("bg-") && "bg-blue-600 text-white hover:bg-blue-700",
        className,
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}
