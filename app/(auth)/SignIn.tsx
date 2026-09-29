import { Text, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
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

    const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
        resolver: yupResolver(schema) as any
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
                    <View className="w-full h-32 bg-primary items-center justify-end pb-5">
                        <Text className="text-shape text-lg font-semibold">Entrar</Text>
                    </View>

                    <View className="flex-1 w-full px-9 pt-9 justify-between bg-secondary">
                        <View>
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
                        </View>

                        <View className="pb-9">
                            <Button
                                title="Entrar"
                                activeOpacity={0.7}
                                onPress={handleSubmit(handleSignIn)}
                            />

                            <TouchableOpacity
                                className="items-center mt-4"
                                onPress={() => router.replace('/SignUp')}
                            >
                                <Text className="text-shape font-medium">Criar conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </GestureHandlerRootView>
    );
}

export default Screen;
