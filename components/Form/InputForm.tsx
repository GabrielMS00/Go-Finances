import { Text, TextInputProps, View } from "react-native";
import { Input } from './Input';
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = TextInputProps & {
    control: Control<T>;
    name: Path<T>;
    error?: string;
}

export function InputForm<T extends FieldValues>({ control, name, error, ...rest }: Props<T>) {
    return (
        <View className="w-full">
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />

            {error &&
                <Text className="text-attention text-sm font-medium mb-2">
                    {error}
                </Text>
            }
        </View>
    );
}
