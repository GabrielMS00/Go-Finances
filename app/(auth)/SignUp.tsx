import { Text, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
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

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: yupResolver(schema) as any
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
            router.replace('/SignIn');

        } catch (error: any) {
            Alert.alert('Não foi possível criar a conta', error.message);
        }
    }

    return (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <View className="w-full h-32 bg-primary items-center justify-end pb-5">
                        <Text className="text-shape text-lg font-semibold">Criar conta</Text>
                    </View>

                    <View className="flex-1 w-full px-9 pt-9 justify-between bg-secondary">
                        <View>
                            <InputForm
                                name="name"
                                control={control}
                                placeholder="Nome"
                                autoCapitalize="words"
                                autoCorrect={false}
                                error={errors.name?.message}
                                className="w-full px-5 py-4 bg-shape rounded-md mb-2 text-xl text-black"
                            />
                            <InputForm
                                name="email"
                                control={control}
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                error={errors.email?.message}
                                className="w-full px-5 py-4 bg-shape rounded-md mb-2 text-xl text-black"
                            />
                            <InputForm
                                name="password"
                                control={control}
                                placeholder="Senha"
                                secureTextEntry
                                error={errors.password?.message}
                                className="w-full px-5 py-4 bg-shape rounded-md mb-2 text-xl text-black"
                            />
                            <InputForm
                                name="confirmPassword"
                                control={control}
                                placeholder="Confirmar senha"
                                secureTextEntry
                                error={errors.confirmPassword?.message}
                                className="w-full px-5 py-4 bg-shape rounded-md mb-2 text-xl text-black"
                            />
                        </View>

                        <View className="pb-9">
                            <Button
                                title="Cadastrar"
                                activeOpacity={0.7}
                                onPress={handleSubmit(handleSignUp)}
                            />

                            <TouchableOpacity
                                className="items-center mt-4"
                                onPress={() => router.replace('/SignIn')}
                            >
                                <Text className="text-shape font-medium">Já tenho conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
}

export default Screen;
