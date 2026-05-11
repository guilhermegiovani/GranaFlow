import { Expense } from "@/src/types";
import { Text, View } from "react-native";


export default function SummaryCard({ expenses }: { expenses: Expense[] }) {

    return (
        <View
            style={{
                backgroundColor: "#f5f5f5",
                padding: 15,
                borderRadius: 8,
                marginBottom: 15,
                borderLeftWidth: 4,
                borderLeftColor: "#2196F3",
            }}
        >
            {/* Calcula total de ganhos */}
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>
                💰 Total Ganhos: <Text style={{ fontWeight: "bold", color: "#4CAF50" }}>
                    {expenses
                        .filter((e: any) => e.type === "income")
                        .reduce((sum: number, e: any) => sum + e.value, 0)
                        .toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                </Text>
            </Text>

            {/* Calcula total de gastos */}
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>
                💸 Total Gastos: <Text style={{ fontWeight: "bold", color: "#f44336" }}>
                    {expenses
                        .filter((e: any) => e.type === "expense")
                        .reduce((sum: number, e: any) => sum + e.value, 0)
                        .toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                </Text>
            </Text>

            {/* Calcula lucro líquido (ganhos - gastos) */}
            <Text style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}>
                📈 Lucro Líquido: <Text style={{
                    color: expenses
                        .filter((e: any) => e.type === "income")
                        .reduce((sum: number, e: any) => sum + e.value, 0) -
                        expenses
                            .filter((e: any) => e.type === "expense")
                            .reduce((sum: number, e: any) => sum + e.value, 0) >= 0
                        ? "#4CAF50"
                        : "#f44336",
                }}>
                    {(expenses
                        .filter((e: any) => e.type === "income")
                        .reduce((sum: number, e: any) => sum + e.value, 0) -
                        expenses
                            .filter((e: any) => e.type === "expense")
                            .reduce((sum: number, e: any) => sum + e.value, 0))
                        .toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                </Text>
            </Text>
        </View>
    )
}