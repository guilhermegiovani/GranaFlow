import { Expense } from "@/src/types";
import { Pressable, Text, View } from "react-native";
import MonthSelector from "./MonthSelector";
import { useState } from "react";


export default function ExpenseFilter({ expenses, filter, setFilter }: { expenses: Expense[]; filter: "all" | "month" | "week"; setFilter: (value: "all" | "month" | "week") => void }) {

    const [selectedMonth, setSelectedMonth] = useState<string>("");

    return (
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Pressable
                onPress={() => {
                    setFilter("all")
                    setSelectedMonth("") // Limpa seleção de mês ao escolher todos
                }}
                style={({ pressed }) => ({
                    padding: 10,
                    backgroundColor: filter === "all" ? "#2196F3" : "#ccc",
                    alignItems: "center",
                    borderRadius: 8,
                    opacity: pressed ? 0.7 : 1, // 👈 efeito simples
                    transform: [{ scale: pressed ? 0.95 : 1 }], // 👈 leve “afundar”
                })}
            >
                <Text style={{ color: "#fff" }}>Todos</Text>
            </Pressable>

            {/* <Pressable
                onPress={() => setFilter("month")}
                style={({ pressed }) => ({
                    padding: 10,
                    backgroundColor: filter === "month" ? "#2196F3" : "#ccc",
                    alignItems: "center",
                    borderRadius: 8,
                    opacity: pressed ? 0.7 : 1, // 👈 efeito simples
                    transform: [{ scale: pressed ? 0.95 : 1 }], // 👈 leve “afundar”
                })}
            >
                <Text style={{ color: "#fff" }}>Mês atual</Text>
            </Pressable> */}

            <MonthSelector expenses={expenses} filter={filter} setFilter={setFilter} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

            <Pressable
                onPress={() => {
                    setFilter("week")
                    setSelectedMonth("") // Limpa seleção de mês ao escolher semana
                }}
                style={({ pressed }) => ({
                    padding: 10,
                    backgroundColor: filter === "week" ? "#2196F3" : "#ccc",
                    alignItems: "center",
                    borderRadius: 8,
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                })}
            >
                <Text style={{ color: "#fff" }}>Semana</Text>
            </Pressable>
        </View>
    )
}