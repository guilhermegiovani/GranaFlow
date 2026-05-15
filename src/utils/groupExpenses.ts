import { Expense } from "@/src/types";


export function groupByCategory(expenses: Expense[]) {
    const justExpenses = expenses.filter(e => e.type === "expense")
    const result = {} as { [category: string]: number };

    justExpenses.forEach((expense) => {
        const category = expense.category;

        if (!result[category]) {
            result[category] = 0
        }

        result[category] += expense.value
    });

    return Object.entries(result).map(([category, total]) => ({
        category,
        total
    }))
}

export function groupByDays(expenses: Expense[]) {
    const justExpenses = expenses.filter(e => e.type === "expense")

    const result = {
        Dom: 0,
        Seg: 0,
        Ter: 0,
        Qua: 0,
        Qui: 0,
        Sex: 0,
        Sab: 0
    } as { [day: string]: number };
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

    justExpenses.forEach((expense) => {
        const date = new Date(expense.date);
        const day = days[date.getDay()]

        result[day] += expense.value
    });

    return Object.entries(result).map(([day, total]) => ({
        day,
        total
    }))
}