import { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = TextInputProps & {
    icon: keyof typeof Feather.glyphMap;
    isPassword?: boolean;
    hasError?: boolean;
}

export const AuthInput = ({ icon, isPassword, hasError, secureTextEntry, ...rest }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const iconColor = hasError ? '#E83F5B' : '#969CB2';

    return (
        <View
            className={`w-full flex-row items-center bg-shape rounded-md border px-4 ${hasError ? 'border-attention' : 'border-gray-200'}`}
        >
            <Feather name={icon} size={20} color={iconColor} />

            <TextInput
                className="flex-1 px-3 py-4 text-base text-title"
                secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
                placeholderTextColor="#969CB2"
                {...rest}
            />

            {isPassword && (
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(visible => !visible)}
                    accessibilityLabel={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#969CB2" />
                </TouchableOpacity>
            )}
        </View>
    );
}
