import { Expense, ExpensesContextType } from "@/src/types";
import { Alert, FlatList, Pressable, RefreshControl, View, Text } from "react-native";
import ExpensesChart from "../Chart/ExpensesChart";
import { useContext, useState } from "react";
import { ExpensesContext } from "@/src/context/ExpensesContext";


export default function ExpenseList({ expenses, filter }: { expenses: Expense[]; filter: string }) {
    
    const { deleteExpense } = useContext(
        ExpensesContext
    ) as ExpensesContextType;

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true)

        // recarregar dados aqui

        setTimeout(() => {
            setRefreshing(false)
        }, 500)
    }

    const expensesOnly = expenses.filter(expense => expense.type === "expense");

    return (
        <FlatList
            ListHeaderComponent={
                expensesOnly.length > 0 ? <ExpensesChart expenses={expensesOnly} filter={filter} /> : null
            }
            contentContainerStyle={{
                paddingBottom: 75, // para dar espaço pro botão flutuante
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={expenses}
            keyExtractor={(item: Expense) => String(item.id)}
            renderItem={({ item }: { item: Expense }) => {
                // Formata a data para formato legível (DD/MM/YYYY)
                const date = new Date(item.date).toLocaleDateString("pt-BR");

                return (
                    <View
                        style={{
                            backgroundColor: item.type === "expense" ? "#ffebee" : "#e8f5e9",
                            padding: 12,
                            marginBottom: 10,
                            borderRadius: 8,
                            borderLeftWidth: 4,
                            borderLeftColor: item.type === "expense" ? "#f44336" : "#4CAF50",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                                {item.description}
                            </Text>
                            <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                                {item.category} • {date}
                            </Text>
                        </View>

                        <View style={{ alignItems: "flex-end", marginRight: 10 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: item.type === "expense" ? "#f44336" : "#4CAF50",
                                }}
                            >
                                {item.type === "expense" ? "-" : "+"}{item.value.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </Text>
                        </View>

                        {/* BOTÃO: Deletar gasto */}
                        <Pressable
                            onPress={() => {
                                Alert.alert(
                                    "Deletar?",
                                    "Tem certeza que quer deletar este gasto?",
                                    [
                                        { text: "Cancelar", style: "cancel" },
                                        {
                                            text: "Deletar",
                                            onPress: () => {
                                                deleteExpense(item.id)
                                            },
                                            style: "destructive",
                                        },
                                    ]
                                );
                            }}
                            style={{
                                padding: 8,
                                backgroundColor: "#ffcdd2",
                                borderRadius: 6,
                            }}
                        >
                            <Text style={{ color: "#c62828", fontWeight: "bold" }}>X</Text>
                        </Pressable>
                    </View>
                );
            }}
            scrollEnabled={true}
        />
    )
}