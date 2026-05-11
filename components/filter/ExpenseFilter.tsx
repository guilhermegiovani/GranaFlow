import { Expense } from "@/src/types";
import { Pressable, Text, View } from "react-native";
import MonthSelector from "./MonthSelector";
import { useState } from "react";
import FilterButton from "./FilterButton";


export default function ExpenseFilter({ expenses, filter, setFilter, selectedMonth, setSelectedMonth }: { expenses: Expense[]; filter: "all" | "month" | "week" | "history"; setFilter: (value: "all" | "month" | "week" | "history") => void; selectedMonth: string; setSelectedMonth: (month: string) => void }) {

    // const currentMonth = new Date().toLocaleDateString("pt-BR", {
    //     month: "long"
    // })

    //const [selectedMonth, setSelectedMonth] = useState<string>("");

    return (
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>

            <FilterButton
                title="Todos"
                isActive={filter === "all"}
                onPress={() => {
                    setFilter("all")
                    setSelectedMonth("") // Limpa seleção de mês ao escolher todos
                }}
            />

            <FilterButton
                title="Mês"
                isActive={filter === "month"}
                onPress={() => {
                    setFilter("month")
                    setSelectedMonth("") // Limpa seleção de mês ao escolher mês atual
                }}
            />

            <FilterButton
                title="Semana"
                isActive={filter === "week"}
                onPress={() => {
                    setFilter("week")
                    setSelectedMonth("") // Limpa seleção de mês ao escolher semana
                }}
            />

            <MonthSelector expenses={expenses} filter={filter} setFilter={setFilter} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </View>
    )
}