import { router } from "expo-router";
import { Alert, Text, View, Platform, TouchableOpacity, ScrollView } from "react-native";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/Auth";
import { SiginSocialButton } from "../../components/SiginSocialButton";
import { Button } from "../../components/Form/Button";
import { useEffect } from "react";

const Screen = () => {
    const { user, isLoading, signInWithApple } = useAuth();

    const handleSignInWithApple = async () => {
        try {
            await signInWithApple();
            router.replace('/(tabs)/Dashboard');

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
        }
    }

    useEffect(() => {
        if (!isLoading && user?.id) {
            router.replace('/(tabs)/Dashboard');
        }
    }, [user, isLoading]);

    return (
        <GestureHandlerRootView>
            <View className="flex-1">
                <View className="w-full h-3/4 bg-primary justify-end items-center">
                    <View className="items-center">
                        <Feather
                            name="dollar-sign"
                            size={60}
                            color={'#FF872C'}
                        />

                        <Text className="font-bold text-5xl text-shape pt-5">Go Finances</Text>

                        <Text
                            className="font-semibold text-shape text-4xl text-center mt-28"
                        >
                            Controle suas {'\n'} finanças de forma {'\n'} muito simples
                        </Text>
                    </View>

                    <Text className="font-medium text-shape text-center text-xl my-20">Faça o seu login com {'\n'} uma das contas abaixo</Text>
                </View>

                <View className="w-full h-1/4 bg-secondary">
                    <ScrollView
                        className="-mt-10"
                        contentContainerClassName="px-9 pb-6"
                        showsVerticalScrollIndicator={false}
                    >
                        <SiginSocialButton title="Entrar com Google" svg={GoogleSvg} />
                        {
                            Platform.OS === 'ios' &&
                            <SiginSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
                        }

                        <Button
                            title="Entrar com e-mail"
                            activeOpacity={0.7}
                            onPress={() => router.push('/SignIn')}
                        />

                        <TouchableOpacity
                            className="items-center mt-4"
                            onPress={() => router.push('/SignUp')}
                        >
                            <Text className="font-medium">Criar conta</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default Screen;
