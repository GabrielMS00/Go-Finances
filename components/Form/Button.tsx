import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
}

export const Button = ({ title, disabled, ...rest }: Props) => {
    return (

        <TouchableOpacity
            className={`w-full p-5 rounded-md items-center ${disabled ? 'bg-secondary/50' : 'bg-secondary'}`}
            disabled={disabled}
            {...rest}
        >
            <Text className="text-xl font-medium text-shape">
                {title}
            </Text>
        </TouchableOpacity>

    );
}
