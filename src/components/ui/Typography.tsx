import { Text as RNText } from "react-native";

type TypographyVariant = "title" | "subtitle" | "body" | "caption";

interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  title: "text-3xl font-bold tracking-tight",
  subtitle: "text-xl font-semibold",
  body: "text-base font-normal",
  caption: "text-sm font-light opacity-70",
};

export function Typography({
  variant = "body",
  className = "",
  children,
}: TypographyProps) {
  return (
    <RNText className={`${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </RNText>
  );
}
