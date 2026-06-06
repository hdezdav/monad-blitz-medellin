import { cn } from "@/lib/utils";

export const BgGradient = ({
  className,
  gradientFrom = "#ffffff",
  gradientTo = "#836EF9",
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "40%",
}) => {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full -z-10 bg-white", className)}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`,
      }}
    />
  );
};
