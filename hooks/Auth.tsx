import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

type AuthProviderProps = {
    children: ReactNode;
}

type AuthContextData = {
    user: User | null;
    isLoading: boolean;
    signInWithApple(): Promise<void>;
    signUpWithEmail(name: string, email: string, password: string): Promise<boolean>;
    signInWithEmail(email: string, password: string): Promise<void>;
    logOut(): Promise<void>;
}

type User = {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

const AuthContext = createContext({} as AuthContextData);

const supabaseErrorMessages: Record<string, string> = {
    'Invalid login credentials': 'E-mail ou senha inválidos',
    'User already registered': 'Este e-mail já está cadastrado',
    'Email not confirmed': 'Confirme seu e-mail antes de entrar',
    'Password should be at least 6 characters': 'A senha deve ter no mínimo 6 caracteres',
}

const getSupabaseErrorMessage = (message: string) => {
    return supabaseErrorMessages[message] ?? message;
}

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUserStorageData() {
            try {
                const userStorage = await AsyncStorage.getItem('@gofinances:user');
                if (userStorage) {
                    const userLogged = JSON.parse(userStorage) as User;
                    setUser(userLogged);
                }
            } catch (error) {
                console.log('Erro ao carregar usuário:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadUserStorageData();
    }, []);

    const signInWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if (credential) {
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: undefined
                };

                setUser(userLogged);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    const signUpWithEmail = async (name: string, email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error) {
            throw new Error(getSupabaseErrorMessage(error.message));
        }

        if (data.session && data.user) {
            const userLogged = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name ?? name,
                photo: undefined
            };

            setUser(userLogged);
            await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
            return true;
        }

        return false;
    }

    const signInWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            throw new Error(getSupabaseErrorMessage(error.message));
        }

        const userLogged = {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name ?? '',
            photo: undefined
        };

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('@gofinances:user');
        setUser(null);
        router.replace('/');
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, signInWithApple, signUpWithEmail, signInWithEmail, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
