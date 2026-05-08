import { Expense } from "@/src/types";


export function groupByCategory(expenses: Expense[]) {
    //const result = [] as { category: string; total: number }[];
    const result = {} as { [category: string]: number };

    expenses.forEach((expense) => {
        const category = expense.category;
        //const total = expense.value;
        //const existing = result.find(e => e.category === category)

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

// export function groupByDays(expenses: Expense[]) {
//     //const result = [] as { category: string; total: number }[];
//     const result = {} as { [category: string]: number };

//     expenses.forEach((expense) => {
//         const category = expense.category;
//         //const total = expense.value;
//         //const existing = result.find(e => e.category === category)

//         if (!result[category]) {
//             result[category] = 0
//         }

//         result[category] += expense.value
//     });

//     return Object.entries(result).map(([category, total]) => ({
//         category,
//         total
//     }))
// }