import { Expense } from "../types";


export default function getUniqueMonths(expenses: Expense[]) {
    const uniqueMonths = new Set<string>();

    expenses.forEach(expense => {
        const month = new Date(expense.date).toLocaleDateString("pt-BR", {
            month: "short",
            year: "numeric",
        });
        uniqueMonths.add(month.charAt(0).toUpperCase() + month.slice(1));
    });

    return Array.from(uniqueMonths);
}