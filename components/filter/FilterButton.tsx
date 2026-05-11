import { Pressable, Text } from "react-native";


export default function FilterButton({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                paddingVertical: 10,
                paddingHorizontal: 14,
                backgroundColor: isActive ? "#2196F3" : "#ccc",
                alignItems: "center",
                borderRadius: 8,
                opacity: pressed ? 0.7 : 1, // 👈 efeito simples
                transform: [{ scale: pressed ? 0.95 : 1 }], // 👈 leve “afundar”
            })}
        >
            <Text style={{ color: isActive ? "#fff" : "#3d3d3d", fontWeight: "bold" }}>
                {title}
            </Text>
        </Pressable>
    )
}