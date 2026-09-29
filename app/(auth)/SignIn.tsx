import { Text, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthInputForm } from "../../components/Form/AuthInputForm";
import { useAuth } from "../../hooks/Auth";
import { SignInFormData } from "../../types/AuthFormData";

const schema = Yup.object().shape({
    email: Yup
        .string()
        .email('Informe um e-mail válido')
        .required('E-mail é obrigatório'),
    password: Yup
        .string()
        .required('Senha é obrigatória'),
})

const Screen = () => {
    const { signInWithEmail } = useAuth();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignInFormData>({
        resolver: yupResolver(schema) as any,
        mode: 'onBlur'
    });

    const handleSignIn = async (form: SignInFormData) => {
        try {
            await signInWithEmail(form.email, form.password);
            router.replace('/(tabs)/Dashboard');

        } catch (error: any) {
            Alert.alert('Não foi possível entrar', error.message);
        }
    }

    return (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <View className="w-full bg-dark_purple flex-row items-center pt-14 pb-4 px-5 h-[12%]">

                        <View className="flex-1 items-start">
                            <TouchableOpacity
                                className="flex-row items-center"
                                onPress={() => router.back()}
                                accessibilityLabel="Voltar"
                            >
                                <Feather name="chevron-left" size={24} color="#FFFFFF" />
                                <Text className="text-shape text-lg font-semibold ml-1">Voltar</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-shape text-2xl font-semibold">Entrar</Text>

                        <View className="flex-1" />
                    </View>

                    <View className="flex-1 w-full px-9 justify-center bg-primary h-[88%]">
                        <View className="w-full justify-center items-center pb-24">
                            <View className="items-center">
                                <Feather
                                    name="dollar-sign"
                                    size={48}
                                    color={'#FF872C'}
                                />

                                <Text className="font-bold text-4xl text-shape pt-3">Go Finances</Text>
                            </View>
                        </View>

                        <View className="mb-32">
                            <AuthInputForm
                                name="email"
                                control={control}
                                icon="mail"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                error={errors.email?.message}
                            />
                            <AuthInputForm
                                name="password"
                                control={control}
                                icon="lock"
                                isPassword
                                placeholder="Senha"
                                error={errors.password?.message}
                            />

                            <TouchableOpacity
                                className='h-16 bg-secondary rounded-md mb-4 flex-row items-center px-5 mt-5'
                                activeOpacity={0.7}
                                disabled={!isValid}
                                onPress={handleSubmit(handleSignIn)}
                            >
                                <Text className='flex-1 text-center font-semibold text-xl text-shape'>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="items-center mt-3"
                                onPress={() => router.push('/SignUp')}
                            >
                                <Text className="text-white font-semibold">
                                    Não tem conta? <Text className="font-bold text-lg">Criar conta</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
}

export default Screen;
