import { View } from "react-native";
import { Typography } from "@/src/components/ui";
import { Button } from "@/src/components/ui";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View className="w-full items-center rounded-2xl bg-red-50 p-6">
      <Typography variant="subtitle" className="text-red-600 mb-2">
        Oops!
      </Typography>
      <Typography variant="body" className="text-red-500 text-center mb-4">
        {message}
      </Typography>
      {onRetry && (
        <Button
          label="Try Again"
          onPress={onRetry}
          className="bg-red-500 active:bg-red-600"
        />
      )}
    </View>
  );
}
