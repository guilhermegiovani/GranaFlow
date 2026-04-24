// ========================================
// TIPOS E INTERFACES DO PROJETO
// ========================================
// Tipos definem a "forma" dos dados no TypeScript
// É como um contrato: "todo Expense deve ter esses campos"

// INTERFACE: Define a estrutura de um gasto/ganho
// Uma interface é como um "molde" para objetos
export interface Expense {
  // id: identificador único (criado com Date.now())
  // number = tipo numérico (ex: 1234567890)
  id: number;

  // description: o quê foi gasto (ex: "Combustível")
  // string = tipo texto (ex: "olá")
  description: string;

  // value: quanto foi gasto em reais (ex: 45.50)
  // number = tipo numérico (ex: 45.50)
  value: number;

  // category: categoria do gasto (ex: "combustível", "pedágio")
  // string = tipo texto
  category: string;

  // type: se é gasto ou ganho
  // "expense" | "income" = UNION TYPE
  // Significa: pode ser APENAS "expense" OU "income", nada mais
  // Assim TypeScript valida se você digitou certo
  type: "expense" | "income";

  // date: data/hora em ISO format (ex: "2026-04-21T10:30:00.000Z")
  // string = tipo texto
  date: string;
}

// TYPE: Tipo para o valor do Context
// Um type é parecido com interface, mas mais flexível
// Usamos aqui para tipar o que o Context fornece
export type ExpensesContextType = {
  // expenses: array (lista) de despesas
  // Expense[] = "array de Expense" (pode ser vazio ou com vários)
  expenses: Expense[];

  // addExpense: função que adiciona gasto
  // (expense: Expense) = recebe um Expense como parâmetro
  // Promise<void> = é assíncrona (usa await) e não retorna nada
  addExpense: (expense: Expense) => Promise<void>;

  // deleteExpense: função que deleta gasto por índice
  // (index: number) = recebe a posição do array
  // Promise<void> = é assíncrona e não retorna nada
  deleteExpense: (index: number) => Promise<void>;

  // updateExpense: função que atualiza gasto
  // (index: number, updatedExpense: Expense) = posição + novo gasto
  // Promise<void> = é assíncrona e não retorna nada
  updateExpense: (index: number, updatedExpense: Expense) => Promise<void>;

  // isLoading: flag indicando se está carregando dados
  // boolean = true ou false
  isLoading: boolean;
};

// TYPE: Para as props do Provider
// Props são os "argumentos" que um component recebe
export type ExpensesProviderProps = {
  // children: o conteúdo dentro do Provider
  // React.ReactNode = pode ser texto, component, ou qualquer coisa React
  children: React.ReactNode;
};
