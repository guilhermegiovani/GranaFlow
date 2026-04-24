# 📱 Gastos App - Documentação Completa

## 🎯 Visão Geral

Aplicativo mobile de controle financeiro pessoal feito com Expo (React Native). Permite registrar ganhos e despesas, visualizar saldo e exportar dados em Excel, desenvolvido com **Expo + React Native + TypeScript**

### 📦 Versão Recomendada do React Native

- Versão estável mais recente do React Native: **0.85** (abril de 2026)
- **Este projeto usa Expo SDK 54** (expo: ~54.0.33) com React Native 0.81.5
- **Motivo:** Compatibilidade com Expo Go no celular físico
- Para projetos Expo Go: Use SDK 54 (mais estável para dispositivos físicos)
- Para projetos web/nativos avançados: Considere SDK 55+

### 📚 Documentação Oficial

- React Native versions: https://reactnative.dev/versions
- React Native Environment Setup: https://reactnative.dev/docs/environment-setup
- Expo Getting Started: https://docs.expo.dev/get-started/set-up-your-environment
- Expo SDK 54: https://docs.expo.dev/versions/v54.0.0/

### ✨ Funcionalidades Implementadas

- ✅ **Adicionar Gastos/Ganhos** com categoria e valor
- ✅ **Listar Gastos** com visual diferenciado (verde/vermelho)
- ✅ **Persistência de Dados** (AsyncStorage/localStorage)
- ✅ **Deletar Gastos** com confirmação
- ✅ **Resumo Financeiro** (Totais + Lucro Líquido)
- ✅ **Exportar para Excel** com cálculos automáticos
- ✅ **TypeScript Completo** com tipos seguros
- ✅ **Compatibilidade Web/Mobile**

---

## 🏗️ Arquitetura do Projeto

```
gastos-app/
├── app/                    # Telas (Expo Router)
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela home (lista gastos)
│   └── add-expense.tsx    # Tela adicionar gasto
├── src/
│   ├── context/
│   │   └── ExpensesContext.tsx  # Gerenciamento estado global
│   ├── types/
│   │   └── index.ts       # Definições TypeScript
│   └── utils/
│       └── exportToExcel.ts     # Função exportar Excel
├── components/            # Componentes reutilizáveis
├── constants/             # Constantes (temas, etc)
└── hooks/                 # Hooks customizados
```

---

## 📊 Estrutura de Dados

### Interface Expense

```typescript
interface Expense {
  id: number; // ID único (timestamp)
  description: string; // Descrição do gasto
  value: number; // Valor em reais
  category: string; // Categoria (combustível, pedágio, etc)
  type: "expense" | "income"; // Tipo: gasto ou ganho
  date: string; // Data ISO string
}
```

### Context API

```typescript
type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (index: number) => Promise<void>;
  updateExpense: (index: number, updatedExpense: Expense) => Promise<void>;
  isLoading: boolean;
};
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`

### Ambiente React Native / Expo

Este projeto usa a pilha Expo, que é a forma mais segura e estável de trabalhar com React Native para mobile e web.

Passos recomendados:
1. Instale o Node.js e o Expo CLI.
2. Crie um novo projeto Expo com a versão mais recente:
   ```bash
   npx create-expo-app@latest
   ```
3. Use `expo upgrade` para manter seu app em dia com a versão mais recente do Expo SDK.
4. Para verificar o ambiente do React Native, siga o guia oficial:
   https://reactnative.dev/docs/environment-setup

### Instalação

```bash
npm install
```

### Executar

```bash
npm start
```

### Plataformas

- **Web:** `w` (usa localStorage)
- **Android:** `a` (usa AsyncStorage)
- **iOS:** `i` (usa AsyncStorage)

---

## 💾 Persistência de Dados

### Estratégia Híbrida

- **Mobile (Android/iOS):** AsyncStorage nativo
- **Web:** localStorage do navegador
- **Fallback:** Sistema detecta ambiente automaticamente

### Funcionamento

1. App abre → Carrega dados salvos
2. Usuário adiciona gasto → Salva automaticamente
3. App fecha → Dados permanecem
4. App reabre → Dados carregam novamente

---

## 📊 Exportação Excel

### Funcionalidades

- ✅ **Arquivo .xlsx** com formatação profissional
- ✅ **Colunas:** Data, Hora, Descrição, Categoria, Valor, Tipo
- ✅ **Totais Automáticos:** Ganhos, Gastos, Lucro Líquido
- ✅ **Compatibilidade:** Web (download) / Mobile (salvamento)

### Estrutura do Excel

```
┌──────────┬───────┬──────────────┬──────────┬────────┬────────┐
│ Data     │ Hora  │ Descrição    │ Categoria│ Valor  │ Tipo   │
├──────────┼───────┼──────────────┼──────────┼────────┼────────┤
│ 21/04... │ 10:30 │ Entrega Shopee│ Ganho   │ 150.00 │ Ganho  │
│ 21/04... │ 10:45 │ Combustível  │ Gasto   │ 45.00  │ Gasto  │
├──────────┴───────┴──────────────┴──────────┴────────┴────────┤
│ RESUMO                                                        │
│ Total Ganho: R$ 150.00                                        │
│ Total Gasto: R$ 45.00                                         │
│ LUCRO LÍQUIDO: R$ 105.00                                      │
└───────────────────────────────────────────────────────────────┘
```

---

## 🎨 Interface do Usuário

### Tela Home

- **Cabeçalho:** Título + Botão Exportar
- **Resumo:** Totais com cores (verde/vermelho)
- **Lista:** Gastos em cards coloridos
- **FAB:** Botão flutuante "+" para adicionar

### Tela Adicionar Gasto

- **Campos:** Descrição, Valor, Categoria
- **Toggle:** Gasto/Ganho com cores visuais
- **Validação:** Campos obrigatórios + formato numérico

### Design System

- **Cores:** Verde (#4CAF50) para ganhos, Vermelho (#f44336) para gastos
- **Tipografia:** Roboto, pesos variados
- **Espaçamento:** Padding consistente (20px base)

---

## 🔧 Tecnologias Utilizadas

### Core

- **React Native 0.81.5** - Framework mobile
- **Expo 54.0.33** - Plataforma de desenvolvimento
- **TypeScript 5.9.2** - Tipagem estática

### Navegação

- **Expo Router 6.0.23** - Roteamento baseado em arquivo

### Estado & Persistência

- **React Context API** - Gerenciamento de estado global
- **@react-native-async-storage/async-storage** - Mobile
- **localStorage** - Web (fallback)

### UI & UX

- **React Native Gesture Handler** - Gestos touch
- **React Native Reanimated** - Animações
- **Expo Vector Icons** - Ícones

### Utilitários

- **xlsx 0.18.5** - Geração Excel
- **expo-file-system** - Manipulação arquivos (mobile)

### Desenvolvimento

- **ESLint** - Linting código
- **Expo Lint** - Regras específicas Expo

---

## 📈 Roadmap Futuro

### Próximas Funcionalidades

- 🔄 **Filtros por Mês** - Visualizar gastos mensais
- 📊 **Gráficos** - Análise visual de gastos
- ✏️ **Editar Gastos** - Modificar entradas existentes
- 🏷️ **Categorias Pré-definidas** - Lista de categorias comuns
- 📱 **Deploy** - Publicação nas stores

### Melhorias Técnicas

- 🔒 **Validações Avançadas** - Formulários mais robustos
- 🎨 **Tema Dark/Light** - Suporte a temas
- 🔄 **Sincronização Nuvem** - Backup online (Firebase)
- 📊 **Relatórios Avançados** - Análises detalhadas

---

## 🚀 Deploy

### Expo EAS (Recomendado)

```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login
eas login

# Build para produção
eas build --platform android
eas build --platform ios

# Submit para stores
eas submit --platform android
eas submit --platform ios
```

### Opções Gratuitas

- **Expo Go:** Teste instantâneo (QR code)
- **Expo Web:** Deploy web gratuito
- **GitHub Pages:** Para versão web

---

## 🐛 Troubleshooting

### Erro: "Native module is null"

- **Causa:** Ambiente web tentando usar AsyncStorage
- **Solução:** Sistema detecta automaticamente e usa localStorage

### Erro: "Arquivo não exportado"

- **Causa:** Problemas de permissões ou FileSystem
- **Solução:** Verificar plataforma (web vs mobile)

### Dados não persistem

- **Mobile:** Verificar se AsyncStorage está instalado
- **Web:** Verificar se localStorage está habilitado

---

## 📝 Desenvolvimento

### Scripts Disponíveis

```bash
npm start          # Inicia servidor Expo
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa na web
npm run lint       # Executa linting
```

### Estrutura de Commits

```
feat: adicionar funcionalidade X
fix: corrigir bug Y
docs: atualizar documentação Z
style: ajustar formatação W
refactor: refatorar código V
```

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Guilherme** - Desenvolvimento do app de controle de gastos para entregadores.

---

## 🙏 Agradecimentos

- **Expo Team** - Plataforma incrível para desenvolvimento mobile
- **React Native Community** - Ecossistema rico de bibliotecas
- **Open Source** - Projetos que tornam tudo possível

---

_Última atualização: 21 de abril de 2026_

---

## 📋 Checklist de Implementação

### ✅ Concluído

- [x] Estrutura Expo + TypeScript
- [x] Context API com persistência
- [x] Telas de adicionar/listar gastos
- [x] Exportação Excel funcional
- [x] Interface responsiva
- [x] Compatibilidade web/mobile
- [x] Validações básicas
- [x] Deletar gastos
- [x] Resumo financeiro

### 🔄 Pendente

- [ ] Filtros por mês
- [ ] Editar gastos existentes
- [ ] Gráficos de análise
- [ ] Deploy nas stores
- [ ] Tema dark/light
- [ ] Backup na nuvem
- [ ] Categorias pré-definidas
- [ ] Validações avançadas

### ✅ Status Atual: SDK 54 Funcionando Perfeitamente

- **Expo SDK:** 54.0.33 ✅
- **React Native:** 0.81.5 ✅
- **Compatibilidade:** Expo Go no celular ✅
- **Lint:** Sem erros ✅
- **Build:** Funcionando ✅
