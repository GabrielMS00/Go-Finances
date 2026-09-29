import { router } from "expo-router";
import { Alert, Text, View, Platform } from "react-native";
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../../hooks/Auth";
import { SiginSocialButton } from "../../components/SiginSocialButton";
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
                <View className="w-full h-[55%] bg-primary justify-center items-center pt-32">
                    <View className="items-center">
                        <Feather
                            name="dollar-sign"
                            size={48}
                            color={'#FF872C'}
                        />

                        <Text className="font-bold text-4xl text-shape pt-3">Go Finances</Text>

                        <Text
                            className="font-semibold text-shape text-2xl text-center mt-6"
                        >
                            Controle suas {'\n'} finanças de forma {'\n'} muito simples
                        </Text>
                    </View>

                    <Text className="font-medium text-shape text-center text-lg my-8 pt-14">Faça o seu login com {'\n'} uma das contas abaixo</Text>
                </View>

                <View className="w-full h-[45%] bg-secondary">
                    <View
                        className="px-9 pt-11 pb-6"
                    >
                        <SiginSocialButton
                            title="Entrar com Google"
                            icon={<GoogleSvg width={28} height={28} />}
                        />
                        {
                            Platform.OS === 'ios' &&
                            <SiginSocialButton
                                title="Entrar com Apple"
                                icon={<AppleSvg width={28} height={28} />}
                                onPress={handleSignInWithApple}
                            />
                        }
                        <SiginSocialButton
                            title="Entrar com e-mail"
                            icon={<Feather name="mail" size={24} color="#5636D3" />}
                            onPress={() => router.push('/SignIn')}
                        />
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

export default Screen;
