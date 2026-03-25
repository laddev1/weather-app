import { TextInput, View } from "react-native";
import { Typography } from "@/src/components/ui";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  error?: string | null;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export function SearchInput({
  value,
  onChangeText,
  onSubmit,
  error,
  placeholder = "Enter city name...",
  containerClassName = "",
  inputClassName = "",
}: SearchInputProps) {
  const borderColor = error ? "border-red-400" : "";

  return (
    <View className={`w-full ${containerClassName}`}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        returnKeyType="search"
        autoCapitalize="words"
        autoCorrect={false}
        className={`w-full rounded-2xl border px-5 py-4 text-base border-gray-300 bg-white text-gray-900 ${borderColor} ${inputClassName}`}
      />
      {error && (
        <Typography variant="caption" className="text-red-500 mt-2 ml-2">
          {error}
        </Typography>
      )}
    </View>
  );
}
