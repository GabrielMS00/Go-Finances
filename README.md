# Go Finances

Aplicativo mobile de controle financeiro pessoal, desenvolvido com React Native e Expo. Permite que o usuário registre transações de entrada e saída, organize-as por categoria e acompanhe um resumo visual de suas finanças.

## Funcionalidades

- Criação de conta e autenticação por e-mail e senha, via Supabase Auth.
- Autenticação social por conta Google e Apple (em desenvolvimento).
- Cadastro de transações financeiras, com nome, valor, tipo (entrada ou saída) e categoria.
- Painel inicial (Dashboard) com resumo de entradas, saídas, total e histórico de transações.
- Tela de resumo com distribuição de gastos por categoria.
- Persistência de sessão e de transações no dispositivo, por meio de armazenamento local.

## Tecnologias utilizadas

- [React Native](https://reactnative.dev) e [Expo](https://expo.dev) (SDK 57)
- [Expo Router](https://docs.expo.dev/router/introduction/) para navegação baseada em arquivos
- [TypeScript](https://www.typescriptlang.org)
- [NativeWind](https://www.nativewind.dev) (Tailwind CSS para React Native)
- [Supabase](https://supabase.com) para autenticação por e-mail e senha
- [React Hook Form](https://react-hook-form.com) e [Yup](https://github.com/jquense/yup) para formulários e validação
- [Victory Native](https://commerce.nearform.com/open-source/victory-native) para gráficos
- AsyncStorage para persistência local de dados

## Pré-requisitos

Antes de começar, é necessário ter instalado:

- [Node.js](https://nodejs.org) (versão 18 ou superior)
- npm (instalado junto com o Node.js)
- O aplicativo [Expo Go](https://expo.dev/go) instalado em um dispositivo físico Android ou iOS, ou um emulador/simulador configurado
- Uma conta no [Supabase](https://supabase.com), para a autenticação por e-mail e senha

## Configuração do ambiente

1. Clone o repositório e acesse a pasta do projeto:

   ```
   git clone <url-do-repositorio>
   cd go-finances
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Crie um projeto no [Supabase](https://supabase.com), caso ainda não tenha um. Em "Project Settings" > "API", copie a Project URL e a chave anon/public.

4. Copie o arquivo de variáveis de ambiente de exemplo e preencha com os valores do passo anterior:

   ```
   cp .env.example .env
   ```

   O arquivo `.env` deve conter:

   ```
   EXPO_PUBLIC_SUPABASE_URL=<url-do-projeto-supabase>
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<chave-anon-do-projeto-supabase>
   ```

5. Opcionalmente, em "Authentication" > "Providers" > "Email", no painel do Supabase, é possível desativar a confirmação de e-mail, para que novas contas sejam autenticadas imediatamente após o cadastro, sem a necessidade de confirmar o endereço de e-mail antes do primeiro acesso.

## Executando o projeto

Com o ambiente configurado, inicie o servidor de desenvolvimento:

```
npm run start
```

Isso abre o Metro Bundler no terminal, exibindo um QR code. Para testar no dispositivo físico:

1. Instale o aplicativo Expo Go na loja de aplicativos (App Store ou Google Play).
2. Certifique-se de que o dispositivo e o computador estejam conectados na mesma rede.
3. Abra o Expo Go e escaneie o QR code exibido no terminal (no iOS, o QR code pode ser escaneado diretamente pela câmera nativa).

O projeto também pode ser executado diretamente em um emulador Android ou simulador iOS, com os comandos `npm run android` ou `npm run ios`, desde que o ambiente nativo correspondente esteja configurado na máquina.

## Estrutura do projeto

```
app/                  Telas e rotas, organizadas pelo Expo Router
  (auth)/              Telas de autenticação: tela inicial, login e cadastro
  (tabs)/               Telas principais do aplicativo: Dashboard, Registrar e Resumo
components/            Componentes de interface reutilizáveis
hooks/                 Hooks customizados, incluindo o contexto de autenticação
lib/                   Configuração de bibliotecas externas, como o cliente do Supabase
types/                 Definições de tipos TypeScript compartilhadas
data/                  Dados estáticos, como a lista de categorias de transações
assets/                Ícones, imagens e arquivos SVG
```

## Limitações conhecidas

O login por conta Google e por conta Apple depende de módulos nativos que não estão disponíveis no aplicativo Expo Go. Para que esses métodos de login funcionem, é necessário gerar uma versão de desenvolvimento nativa do aplicativo (development build), por meio do EAS Build ou de um ambiente de build local. Até que essa versão seja gerada, o cadastro e o login por e-mail e senha são a forma recomendada de testar o aplicativo pelo Expo Go.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run start` | Inicia o servidor de desenvolvimento do Expo |
| `npm run android` | Inicia o aplicativo em um emulador ou dispositivo Android |
| `npm run ios` | Inicia o aplicativo em um simulador ou dispositivo iOS |
| `npm run web` | Inicia o aplicativo no navegador |
