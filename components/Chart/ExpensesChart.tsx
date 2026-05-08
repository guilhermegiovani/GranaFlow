import { Expense } from "@/src/types";
import ExpensesLineChart from "./ExpensesLineChart";
import ExpensesPieChart from "./ExpensesPieChart";

export default function ExpensesChart({ expenses, filter }: { expenses: Expense[] } & { filter: string }) {

    if (filter === "week") {
        return <ExpensesLineChart expenses={expenses} />
    }

    return <ExpensesPieChart expenses={expenses} />
}