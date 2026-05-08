import { Expense } from "@/src/types";
import { getWeeklyExpenses } from "@/src/utils/dateFilters";
// import { groupByDays } from "./groupExpenses";

export default function ExpensesLineChart({ expenses }: { expenses: Expense[] }) {
    const grouped = getWeeklyExpenses(expenses) //groupByDays(expenses)

    
    return (
        <></>
    )
}