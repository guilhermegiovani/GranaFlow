import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { ExpensesContext } from "../src/context/ExpensesContext";
import { exportToExcel } from "../src/utils/exportToExcel";
// Importa os tipos que criamos
import { Expense, ExpensesContextType } from "../src/types/index";

export default function Home() {
    // Pega o router para navegar entre telas
    const router = useRouter();

    // Pega os dados do Context (agora com persistência via AsyncStorage)
    // ExpensesContextType = tipagem (valida que context tem essas funções)
    // ! = "force" (garante que não é undefined)
    const { expenses, deleteExpense, isLoading } = useContext(
        ExpensesContext
    ) as ExpensesContextType;

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Meus Gastos
                </Text>

                {/* BOTÃO: Exportar para Excel */}
                <Pressable
                    onPress={() => exportToExcel(expenses)}
                    style={{
                        backgroundColor: "#2196F3",
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 6,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginLeft: 5 }}>
                        📊 Exportar
                    </Text>
                </Pressable>
            </View>

            {/* RESUMO: Mostra totais de ganhos, gastos e lucro */}
            {expenses.length > 0 && (
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
            )}

            {/* CONDIÇÃO: Se ainda está carregando dados do AsyncStorage, mostra mensagem */}
            {isLoading ? (
                <Text>Carregando dados...</Text>
            ) : expenses.length === 0 ? (
                // Se não tem nenhum gasto, mostra mensagem vazia
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: "#999" }}>
                        Nenhum gasto ainda. Clique em + para adicionar.
                    </Text>
                </View>
            ) : (
                // Se tem gastos, exibe a lista com melhor formatação
                <FlatList
                    data={expenses}
                    keyExtractor={(item: Expense, index: number) => String(item.id || index)}
                    renderItem={({ item, index }: { item: Expense; index: number }) => {
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
                                                    onPress: () => deleteExpense(index),
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
            )}

            {/* BOTÃO FLUTUANTE: + para adicionar novo gasto */}
            <Pressable
                onPress={() => router.push("/add-expense")}
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#4CAF50",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 5, // Sombra no Android
                    shadowColor: "#000", // Sombra no iOS
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>+</Text>
            </Pressable>

        </View>
    );
}