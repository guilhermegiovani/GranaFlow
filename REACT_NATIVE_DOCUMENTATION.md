# React Native e Expo - Documentação Atualizada

## 1. Versão atual e segura do React Native

- A versão estável mais recente do React Native, segundo a documentação oficial, é **React Native 0.85**.
- **Este projeto usa Expo SDK 54** com React Native 0.81.5
- **Motivo da escolha:** Compatibilidade com Expo Go em dispositivos físicos
- Durante o período de transição do SDK 55, projetos que usam Expo Go devem permanecer no SDK 54

## 2. Por que SDK 54 para Expo Go?

Segundo a documentação oficial do Expo:

> "Note: During the SDK 55 transition period, create-expo-app@latest without the --template flag creates an SDK 54 project. If you plan to use Expo Go on a physical device, use an SDK 54 project. Otherwise, use --template default@sdk-55 to create an SDK 55 project."

### Quando usar SDK 54:

- ✅ **Expo Go** no celular físico
- ✅ Projetos que precisam de máxima estabilidade
- ✅ Desenvolvimento com dispositivos reais

### Quando usar SDK 55:

- 🔄 Projetos web avançados
- 🔄 Desenvolvimento nativo complexo
- 🔄 Quando não precisa de Expo Go

### Para apps React Native puro

- Verifique a versão mais recente em:
  - https://reactnative.dev/versions
- Siga o guia oficial de atualização:
  - https://reactnative.dev/docs/upgrading

## 3. Ambiente recomendado para desenvolvimento

### Pré-requisitos

- Node.js (versão LTS)
- npm ou yarn
- Editor de código recomendado: VS Code
- Expo CLI (para projetos Expo):
  ```bash
  npm install -g expo-cli
  ```

### Configuração do ambiente

- Siga o guia oficial de instalação:
  - https://reactnative.dev/docs/environment-setup
- Use o fluxo "React Native CLI Quickstart" para apps nativos ou "Expo CLI Quickstart" para apps Expo.

### Plataformas suportadas

- Android
- iOS
- Web (via Expo)
- TV (quando necessário)

---

## ✅ Status Final: SDK 54 Configurado e Funcionando

### Verificações Realizadas:

- ✅ **Expo SDK 54** instalado e funcionando
- ✅ **React Native 0.81.5** compatível
- ✅ **Expo Go** no celular funcionando
- ✅ **Lint** sem erros
- ✅ **AsyncStorage** corrigido para SDK 54
- ✅ **FileSystem** compatível com SDK 54
- ✅ **TypeScript** sem warnings
- ✅ **Servidor Expo** iniciando corretamente

### Por que SDK 54 é a escolha certa:

- **Estabilidade:** Mais testado e estável para produção
- **Expo Go:** Compatibilidade perfeita com dispositivos físicos
- **Suporte:** Melhor suporte da comunidade
- **Documentação:** Mais madura e completa

---

_Última atualização: 23 de abril de 2026_

## 4. Fluxo de criação de um novo app Expo

```bash
npx create-expo-app@latest my-app
cd my-app
npm install
npm start
```

### Executar nas plataformas

- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## 5. Documentação oficial útil

- React Native versions: https://reactnative.dev/versions
- Environment setup: https://reactnative.dev/docs/environment-setup
- Getting started with Expo: https://docs.expo.dev/get-started/
- Upgrade guide: https://reactnative.dev/docs/upgrading

## 6. Nota importante para este projeto

- O app atual está usando **Expo SDK 54** e **React Native 0.81.5**.
- Para chegar à versão mais recente do React Native, atualize o Expo SDK para uma versão compatível com React Native 0.85 ou superior.
- Não é recomendado trocar apenas `react-native` em um projeto Expo sem atualizar o `expo` e os pacotes relacionados.
