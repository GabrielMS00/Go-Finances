import { Text, TextInputProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthInput } from './AuthInput';
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = TextInputProps & {
    control: Control<T>;
    name: Path<T>;
    icon: keyof typeof Feather.glyphMap;
    isPassword?: boolean;
    error?: string;
}

export function AuthInputForm<T extends FieldValues>({ control, name, icon, isPassword, error, ...rest }: Props<T>) {
    return (
        <View className="w-full mb-4">
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, onBlur } }) => (
                    <AuthInput
                        icon={icon}
                        isPassword={isPassword}
                        hasError={!!error}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        {...rest}
                    />
                )}
            />

            {error &&
                <View className="flex-row items-center mt-1">
                    <Feather name="alert-circle" size={14} color="#E83F5B" />
                    <Text className="text-attention text-sm font-medium ml-1">
                        {error}
                    </Text>
                </View>
            }
        </View>
    );
}
