import { Dimensions, Animated } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { Expense } from "@/src/types";
import { groupByCategory } from "./groupExpenses";
import { useEffect, useRef } from "react";

export default function ExpensesPieChart({ expenses }: { expenses: Expense[] }) {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const translateYAnim = useRef(new Animated.Value(20)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true
            }),

            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true
            })
        ]).start()
    }, [])

    if (!expenses.length) return null

    // 1. agrupar por categoria
    const getCategory = groupByCategory(expenses);
    const groupedFive = getCategory.slice(0, 5) // pegar as 5 categorias mais gastas
    const othersTotal = getCategory.slice(5).reduce((sum, item) => sum + item.total, 0) // somar o total das categorias restantes
    if (othersTotal > 0) {
        groupedFive.push({ category: "Outros", total: othersTotal }) // adicionar categoria "Outros"
    }

    const grouped = groupedFive

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#9CA3AF"]
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
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [
                    {
                        translateY: translateYAnim
                    }
                ]
            }}
        >
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
        </Animated.View>
    )
}