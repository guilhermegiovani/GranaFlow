import formatCurrency from "@/src/utils/formatCurrency";
import { Text, View } from "react-native";


export default function PeriodCard({ income, expense, title, cardStyle }: { income: number; expense: number; title: string; cardStyle: any }) {
    
    return (
        <View style={cardStyle}>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
                📅 {title}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12 }}>
                    💰:
                </Text>

                <Text style={{ color: "#4CAF50", fontWeight: "bold", fontSize: 12, marginLeft: 5 }}>
                    {formatCurrency(income)}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12 }}>
                    💸:
                </Text>

                <Text style={{ color: "#f44336", fontWeight: "bold", fontSize: 12, marginLeft: 5 }}>
                    {formatCurrency(expense)}
                </Text>
            </View>
        </View>
    )
}