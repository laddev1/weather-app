import { ActivityIndicator, Pressable, Text } from "react-native";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const CONTAINER_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 active:bg-blue-700",
  secondary: "bg-transparent border border-gray-400 active:bg-gray-100",
};

const LABEL_CLASSES: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-gray-800",
};

const DISABLED_CLASSES = "opacity-50";

export function Button({
  variant = "primary",
  label,
  onPress,
  isLoading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center rounded-xl px-6 py-3 ${CONTAINER_CLASSES[variant]} ${isDisabled ? DISABLED_CLASSES : ""} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#ffffff" : "#1f2937"}
        />
      ) : (
        <Text className={`text-base font-semibold ${LABEL_CLASSES[variant]}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
