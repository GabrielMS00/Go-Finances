import { Text, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthInputForm } from "../../components/Form/AuthInputForm";
import { useAuth } from "../../hooks/Auth";
import { SignUpFormData } from "../../types/AuthFormData";

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    email: Yup
        .string()
        .email('Informe um e-mail válido')
        .required('E-mail é obrigatório'),
    password: Yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'As senhas não coincidem')
        .required('Confirme sua senha'),
})

const Screen = () => {
    const { signUpWithEmail } = useAuth();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignUpFormData>({
        resolver: yupResolver(schema) as any,
        mode: 'onBlur'
    });

    const handleSignUp = async (form: SignUpFormData) => {
        try {
            const isLoggedIn = await signUpWithEmail(form.name, form.email, form.password);

            if (isLoggedIn) {
                router.replace('/(tabs)/Dashboard');
                return;
            }

            Alert.alert(
                'Confirme seu e-mail',
                'Enviamos um link de confirmação para o seu e-mail. Confirme para poder entrar.'
            );
            router.push('/SignIn');

        } catch (error: any) {
            Alert.alert('Não foi possível criar a conta', error.message);
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

                        <Text className="text-shape text-2xl font-semibold">Cadastrar</Text>

                        <View className="flex-1" />
                    </View>

                    <View className="flex-1 w-full px-9 justify-center bg-primary h-[88%]">
                        <View className="w-full justify-center items-center pb-[63px]">
                            <View className="items-center">
                                <Feather
                                    name="dollar-sign"
                                    size={48}
                                    color={'#FF872C'}
                                />

                                <Text className="font-bold text-4xl text-shape pt-3">Go Finances</Text>
                            </View>
                        </View>

                        <View>
                            <AuthInputForm
                                name="name"
                                control={control}
                                icon="user"
                                placeholder="Nome"
                                autoCapitalize="words"
                                autoCorrect={false}
                                error={errors.name?.message}
                            />
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
                            <AuthInputForm
                                name="confirmPassword"
                                control={control}
                                icon="lock"
                                isPassword
                                placeholder="Confirmar senha"
                                error={errors.confirmPassword?.message}
                            />

                            <TouchableOpacity
                                className={`h-16 rounded-md mb-4 flex-row items-center px-5 mt-5 ${isValid ? 'bg-secondary' : 'bg-secondary/60'}`}
                                activeOpacity={0.7}
                                onPress={handleSubmit(handleSignUp)}
                            >
                                <Text className='flex-1 text-center font-semibold text-xl text-shape'>Cadastrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="items-center mt-4"
                                onPress={() => router.push('/SignIn')}
                            >
                                <Text className="text-white font-semibold">
                                    Já tem conta? <Text className="font-bold text-lg">Entrar</Text>
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
