import { createContext, useCallback, useEffect, useState } from "react";
// Importa os tipos que criamos (Expense, ExpensesContextType, etc)
import { Expense, ExpensesContextType, ExpensesProviderProps } from "../types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

// createContext cria um "container" para compartilhar dados entre components
// Agora tipamos com ExpensesContextType para validação de tipos
export const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

// COMPONENT: Provider que fornece dados a toda a app
// ExpensesProviderProps = recebe children (o conteúdo dentro)
export function ExpensesProvider({ children }: ExpensesProviderProps) {
  // Estado que armazena todos os gastos em memória
  // Expense[] = "array de Expense" (lista tipada de gastos)
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Flag para indicar se já carregou os dados do storage
  const [isLoading, setIsLoading] = useState(true);

  // Hook que executa UMA VEZ quando o component abre ([] = apenas na montagem)
  useEffect(() => {
    // Chama a função para carregar dados salvos
    loadExpensesFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas uma vez na montagem

  // Função para CARREGAR dados do localStorage (funciona em web e mobile)
  // async = função assíncrona (usa await)
  // Promise<void> = não retorna nada, mas é assíncrona
  const loadExpensesFromStorage = useCallback(async (): Promise<void> => {
    try {
      //let savedExpenses: string | null = null;

      // Verifica se localStorage está disponível
      // if (typeof window !== "undefined" && window.localStorage) {
      //   savedExpenses = window.localStorage.getItem("expenses");
      // }
      const savedExpenses = await AsyncStorage.getItem("expenses");

      // Se existem dados salvos, converte de volta para objeto e carrega
      if (savedExpenses) {
        // JSON.parse converte string JSON para objeto JavaScript
        // as Expense[] = "força" o TypeScript a tratar como array de Expense
        const parsedExpenses = JSON.parse(savedExpenses) as Expense[];
        setExpenses(parsedExpenses);
      }
    } catch (error) {
      // Se houver erro (ex: storage corrompido), mostra no console
      console.error("Erro ao carregar despesas:", error);
    } finally {
      // Marca que terminou de carregar (independente de sucesso ou erro)
      setIsLoading(false);
    }
  }, []);

  // Função para SALVAR dados no localStorage (funciona em web e mobile)
  // expensesData: Expense[] = recebe um array tipado de Expense
  const saveExpensesToStorage = async (expensesData: Expense[]): Promise<void> => {
    try {
      // Converte o array em JSON e salva
      const jsonData = JSON.stringify(expensesData);

      // Verifica se localStorage está disponível antes de usar
      // if (typeof window !== "undefined" && window.localStorage) {
      //   window.localStorage.setItem("expenses", jsonData);
      // } else {
      //   console.warn("localStorage não disponível neste ambiente");
      // }
      await AsyncStorage.setItem("expenses", jsonData);
    } catch (error) {
      // Se houver erro ao salvar, mostra no console
      console.error("Erro ao salvar despesas:", error);
    }
  };

  // Função para ADICIONAR um novo gasto
  // expense: Expense = recebe um gasto tipado (TypeScript valida!)
  const addExpense = async (expense: Expense): Promise<void> => {
    // Cria um novo array com o gasto anterior + o novo gasto
    const updatedExpenses: Expense[] = [...expenses, expense];

    // Atualiza o estado (renderiza na tela)
    setExpenses(updatedExpenses);

    // Salva no AsyncStorage para persistir dados
    await saveExpensesToStorage(updatedExpenses);
  };

  // Função para DELETAR um gasto por índice
  // index: number = recebe a posição no array (ex: 0, 1, 2)
  const deleteExpense = async (index: number): Promise<void> => {
    // Remove o item do array usando filter
    // filter cria novo array SEM o item na posição 'index'
    const updatedExpenses: Expense[] = expenses.filter(
      (_: Expense, i: number) => i !== index
    );

    // Atualiza o estado (renderiza na tela)
    setExpenses(updatedExpenses);

    // Salva no AsyncStorage
    await saveExpensesToStorage(updatedExpenses);
  };

  // Função para ATUALIZAR um gasto existente
  // index: number = posição do gasto no array
  // updatedExpense: Expense = novo gasto com dados atualizados
  const updateExpense = async (
    index: number,
    updatedExpense: Expense
  ): Promise<void> => {
    // Cria novo array com o gasto atualizado na posição correta
    // map percorre cada item e substitui na posição 'index'
    const updatedExpenses: Expense[] = expenses.map(
      (expense: Expense, i: number) => (i === index ? updatedExpense : expense)
    );

    // Atualiza o estado (renderiza na tela)
    setExpenses(updatedExpenses);

    // Salva no AsyncStorage
    await saveExpensesToStorage(updatedExpenses);
  };

  // Retorna o Context com todos os dados e funções tipadas
  // value tipado com ExpensesContextType
  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        isLoading,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}