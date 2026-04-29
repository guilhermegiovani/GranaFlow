import { Expense } from "../types";

export function getMonthlyExpenses(expenses: Expense[]): Expense[] {
    const now = new Date();

    return expenses.filter((exp) => {
        const date = new Date(exp.date);

        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    });
    // lógica aqui
}

export function getWeeklyExpenses(expenses: Expense[]): Expense[] {
    const now = new Date();

    // início da semana
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - now.getDay());

    // fim da semana
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return expenses.filter((exp) => {
        const date = new Date(exp.date);

        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    });
}

export function sumByType(expenses: Expense[], type: "income" | "expense"): number {
  return expenses
    .filter((e) => e.type === type)
    .reduce((sum, e) => sum + e.value, 0);
}

export function sumTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.value, 0);
}