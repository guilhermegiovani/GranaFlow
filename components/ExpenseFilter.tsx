import { Pressable, Text, View } from "react-native";


export default function ExpenseFilter({ filter, setFilter }: { filter: "all" | "month" | "week"; setFilter: (value: "all" | "month" | "week") => void }) {

    return (
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Pressable
                onPress={() => setFilter("all")}
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

            <Pressable
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
                <Text style={{ color: "#fff" }}>Mês</Text>
            </Pressable>

            <Pressable
                onPress={() => setFilter("week")}
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