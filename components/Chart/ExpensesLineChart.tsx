import { Expense } from "@/src/types";
import { getWeeklyExpenses } from "@/src/utils/dateFilters";
import { groupByDays } from "../../src/utils/groupExpenses";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function ExpensesLineChart({ expenses }: { expenses: Expense[] }) {
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


    const screenWidth = Dimensions.get("window").width - 32
    const groupedDays = groupByDays(expenses)

    const labels = groupedDays.map((dayGroup) => dayGroup.day);
    const values = groupedDays.map((dayGroup) => dayGroup.total);

    const dataExpenses = {
        labels,
        datasets: [
            {
                data: values
            }
        ]
    };

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
                padding: 12,
                borderRadius: 16,
                elevation: 2,
                overflow: "hidden"
            }}
        >
            <Text
                style={{ textAlign: "center", fontSize: 16, marginBottom: 10 }}
            >Gastos por dia da semana</Text>

            <LineChart
                data={dataExpenses}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#f2f2f2",
                    backgroundGradientTo: "#f2f2f2",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#36A2EB"
                    }
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}
                withInnerLines={false}
                withDots={false}
            />
        </Animated.View>
    )
}