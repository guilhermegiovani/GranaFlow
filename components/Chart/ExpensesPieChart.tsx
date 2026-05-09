import { Dimensions, Animated, Text } from "react-native"
import { PieChart } from "react-native-chart-kit"
import { Expense } from "@/src/types";
import { groupByCategory } from "../../src/utils/groupExpenses";
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
                marginBottom: 16,
                opacity: fadeAnim,
                transform: [
                    {
                        translateY: translateYAnim
                    }
                ],
                backgroundColor: "#f2f2f2",
                padding: 16,
                borderRadius: 16,
                elevation: 2,
                overflow: "hidden"
            }}
        >
            <Text
                style={{ textAlign: "center", fontSize: 16, marginBottom: 8 }}
            >Gastos por categoria</Text>

            <PieChart
                data={data}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#f2f2f2",
                    backgroundGradientTo: "#f2f2f2",
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