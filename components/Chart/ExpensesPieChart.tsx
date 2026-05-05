import { Dimensions } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { Expense } from "@/src/types";
import groupByCategory from "./GroupByCategory";

export default function ExpensesPieChart({ expenses }: { expenses: Expense[] }) {
    if (!expenses.length) return null

    // 1. agrupar por categoria
    const grouped = groupByCategory(expenses);

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"]
    const screenWidth = Dimensions.get("window").width - 32

    // 2. transformar pro formato do gráfico
    const data = grouped.map((item, index) => ({
        name: item.category,
        total: item.total,
        color: colors[index % colors.length], // definir cor
        legendFontColor: "#000",
        legendFontSize: 12
    }))

    return (
        <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="total"
            backgroundColor="transparent"
            paddingLeft="15"
        />
    )
}