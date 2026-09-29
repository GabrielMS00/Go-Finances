import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type Props = TouchableOpacityProps & {
    title: string;
    icon: ReactNode;
}

export const SiginSocialButton = ({ title, icon, ...rest }: Props) => {
    return (
        <TouchableOpacity
            className='h-16 bg-shape rounded-md mb-4 flex-row items-center px-5'
            activeOpacity={0.7}
            {...rest}
        >
            <View className='w-8 items-center'>
                {icon}
            </View>

            <Text className='flex-1 text-center font-semibold text-base text-title'>{title}</Text>
        </TouchableOpacity>
    );
}
