// Dropdown para selecionar o mês/ano
import React, { useState } from "react";
import { ViewStyle, View, Text, TouchableOpacity, Modal, FlatList, Pressable } from "react-native";
import getUniqueMonths from "@/src/utils/getUniqueMonths";

export default function MonthSelector(
    { expenses, filter, setFilter, selectedMonth, setSelectedMonth }: 
    { expenses: any[]; filter: "all" | "month" | "week"; setFilter: (value: "all" | "month" | "week") => void; selectedMonth: string; setSelectedMonth: (month: string) => void }
) {

    const [modalVisible, setModalVisible] = useState(false);
    const uniqueMonths = getUniqueMonths(expenses);

    const handleSelectMonth = (month: string) => {
        setSelectedMonth(month);
        setModalVisible(false);
    };

    const overlay: ViewStyle = {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    }

    const styleModal: ViewStyle = {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20
    }

    return (
        <>
            <Pressable
                onPress={() => {
                    setModalVisible(true)
                    setFilter("month")
                }}
                style={({ pressed }) => ({
                    padding: 10,
                    backgroundColor: filter === "month" ? "#2196F3" : "#ccc",
                    alignItems: "center",
                    borderRadius: 8,
                    opacity: pressed ? 0.7 : 1,
                    transform: [{ scale: pressed ? 0.96 : 1 }],
                })}
            >
                <Text style={{ color: "#fff" }}>{selectedMonth || "Selecione o mês"}</Text>
            </Pressable>

            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="fade"
            >
                <View style={overlay}>
                    <View style={styleModal}>
                        <FlatList
                            data={uniqueMonths}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectMonth(item)}
                                    style={{ padding: 10 }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <Pressable
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: "#f5f5f5",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text>X</Text>
                        </Pressable>
                    </View>

                </View>
                {/* Colocar um botão X pra fechar modal */}
            </Modal >
        </>
    );
}