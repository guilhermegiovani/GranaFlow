import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ExpensesContext } from "../src/context/ExpensesContext";
import { exportToExcel } from "../src/utils/exportToExcel";
// Importa os tipos que criamos
import { Expense, ExpensesContextType } from "../src/types/index";

import { getHistoryExpenses, getMonthlyExpenses, getWeeklyExpenses, sumByType } from "../src/utils/dateFilters";
import { StatusBar } from 'expo-status-bar';
// import ExpensesPieChart from "@/components/Chart/ExpensesPieChart";
// import ExpensesChart from "@/components/Chart/ExpensesChart";
import ExpenseList from "@/components/list/ExpenseList";
import ExpenseFilter from "@/components/filter/ExpenseFilter";
import PeriodCard from "@/components/cards/PeriodCard";
import SummaryCard from "@/components/cards/SummaryCard";
import getUniqueMonths from "@/src/utils/getUniqueMonths";
import MonthSelector from "@/components/filter/MonthSelector";



export default function Home() {
    // Pega o router para navegar entre telas
    const router = useRouter();

    // Pega os dados do Context (agora com persistência via AsyncStorage)
    // ExpensesContextType = tipagem (valida que context tem essas funções)
    // ! = "force" (garante que não é undefined)
    const { expenses, isLoading } = useContext(
        ExpensesContext
    ) as ExpensesContextType;

    const [selectedMonth, setSelectedMonth] = useState<string>("");

    const monthlyExpenses = getMonthlyExpenses(expenses);
    const weeklyExpenses = getWeeklyExpenses(expenses);
    const historyExpenses = selectedMonth ? getHistoryExpenses(expenses, selectedMonth) : [];

    console.log("Filtered History Expenses:", historyExpenses);

    const monthlyIncome = sumByType(monthlyExpenses, "income");
    const monthlyExpense = sumByType(monthlyExpenses, "expense");

    const weeklyIncome = sumByType(weeklyExpenses, "income");
    const weeklyExpense = sumByType(weeklyExpenses, "expense");

    // const historyIncome = sumByType(historyExpenses, "income");
    // const historyExpense = sumByType(historyExpenses, "expense");

    const getMonthName = () => {
        const month = new Date().toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
        })

        return month.charAt(0).toUpperCase() + month.slice(1)
    }

    const monthCard = {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 4,
        flex: 1,
        borderLeftColor: "#2196F3"
    };

    const weekCard = {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderLeftWidth: 4,
        flex: 1,
        borderLeftColor: "#9C27B0"
    };

    const [filter, setFilter] = useState<"all" | "month" | "week" | "history">("all");

    const filteredExpenses =
        filter === "month"
            ? monthlyExpenses
            : filter === "week"
                ? weeklyExpenses
                : filter === "history"
                    ? historyExpenses
                    : expenses; // Se for "all", mostra todas as despesas

    const sortedExpenses = [...filteredExpenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    //console.log(getUniqueMonths(expenses));

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <StatusBar style="dark" />

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Meus Gastos
                </Text>

                {/* BOTÃO: Exportar para Excel */}
                <Pressable
                    onPress={() => exportToExcel(filteredExpenses, filter)}
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
                <SummaryCard expenses={expenses} />
            )}

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
                <PeriodCard
                    income={monthlyIncome}
                    expense={monthlyExpense}
                    title={getMonthName()}
                    cardStyle={monthCard}
                />

                <PeriodCard
                    income={weeklyIncome}
                    expense={weeklyExpense}
                    title=" Esta semana"
                    cardStyle={weekCard}
                />
            </View>

            {/* <MonthSelector expenses={expenses} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} /> */}

            {/* Filtro de despesas */}
            <ExpenseFilter
                expenses={expenses}
                filter={filter}
                setFilter={setFilter}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
            />

            {/* CONDIÇÃO: Se ainda está carregando dados do AsyncStorage, mostra mensagem */}
            {isLoading ? (
                <Text>Carregando dados...</Text>
            ) : sortedExpenses.length === 0 ? (
                // Se não tem nenhum gasto, mostra mensagem vazia
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, color: "#999" }}>
                        Nenhum gasto ainda. Clique em + para adicionar.
                    </Text>
                </View>
            ) : (
                // Se tem gastos, exibe a lista com melhor formatação
                <ExpenseList expenses={sortedExpenses} filter={filter} />
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
                    shadowRadius: 3
                }}
            >
                <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>+</Text>
            </Pressable>

        </View>
    );
}