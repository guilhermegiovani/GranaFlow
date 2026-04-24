import { View, Text, TextInput, Pressable } from "react-native";
import { useState, useContext } from "react";
import { ExpensesContext } from "../src/context/ExpensesContext";
import { useRouter } from "expo-router";
// Importa o tipo Expense que criamos
import { Expense, ExpensesContextType } from "../src/types/index";

export default function AddExpense() {
    // Pega a função addExpense do Context (que agora salva no AsyncStorage)
    // ExpensesContextType = tipagem do Context (valida que existe a função)
    // ! = "force" (diz ao TypeScript que o Context existe, não é undefined)
    const { addExpense } = useContext(ExpensesContext) as ExpensesContextType;

    // Router para navegar entre telas
    const router = useRouter();

    // Estados para armazenar os valores dos inputs
    // string = tipo texto (pode estar vazio "")
    const [description, setDescription] = useState<string>("");  // O que foi gasto
    const [value, setValue] = useState<string>("");              // Quanto foi gasto (como string pq input é texto)
    // "expense" | "income" = UNION TYPE (só pode ser um dos dois)
    const [type, setType] = useState<"expense" | "income">("expense"); // Se é gasto ou ganho
    const [category, setCategory] = useState<string>("");        // Categoria (combustível, pedágio, etc)

    return (
        <View style={{ flex: 1, padding: 20 }}>

            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Adicionar Gasto
            </Text>

            <TextInput
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginTop: 20,
                    borderRadius: 8,
                }}
            />

            <TextInput
                placeholder="Valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 8,
                }}
            />

            <TextInput
                placeholder="Categoria (ex: combustível)"
                value={category}
                onChangeText={setCategory}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 8,
                }}
            />

            <View style={{ flexDirection: "row", marginTop: 10 }}>

                <Pressable
                    onPress={() => setType("expense")}
                    style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: type === "expense" ? "#f44336" : "#ccc",
                        alignItems: "center",
                        borderRadius: 8,
                        marginRight: 5,
                    }}
                >
                    <Text style={{ color: "#fff" }}>Gasto</Text>
                </Pressable>

                <Pressable
                    onPress={() => setType("income")}
                    style={{
                        flex: 1,
                        padding: 10,
                        backgroundColor: type === "income" ? "#4CAF50" : "#ccc",
                        alignItems: "center",
                        borderRadius: 8,
                        marginLeft: 5,
                    }}
                >
                    <Text style={{ color: "#fff" }}>Ganho</Text>
                </Pressable>

            </View>

            <Pressable
                onPress={() => {
                    // VALIDAÇÃO 1: Verifica se todos os campos foram preenchidos
                    if (!description || !value || !category) {
                        console.log("Preencha todos os campos");
                        return;
                    }

                    // CONVERSÃO: Transforma o valor em número (substitui vírgula por ponto)
                    // Exemplo: "50,00" → 50.00 → 50
                    const parsedValue = Number(value.replace(",", "."));

                    // VALIDAÇÃO 2: Verifica se o valor é realmente um número válido
                    if (isNaN(parsedValue)) {
                        console.log("Valor inválido");
                        return;
                    }

                    // CRIAÇÃO: Monta o objeto com todos os dados do gasto
                    // Expense = tipagem (TypeScript valida que tem todos os campos)
                    const newExpense: Expense = {
                        description,
                        value: parsedValue,
                        category,
                        type,
                        date: new Date().toISOString(),  // Salva a data/hora atual (ISO format)
                        id: Date.now(),                  // ID único baseado no timestamp (number)
                    };

                    // LIMPEZA: Limpa os inputs após salvar
                    setCategory("");
                    setDescription("");
                    setValue("");

                    // SALVAMENTO: Chama a função que salva no Context (e no AsyncStorage)
                    addExpense(newExpense);
                    
                    // NAVEGAÇÃO: Volta para a tela anterior (home)
                    router.back();
                }}
                style={{
                    marginTop: 20,
                    backgroundColor: "#4CAF50",
                    padding: 15,
                    borderRadius: 8,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#fff" }}>Salvar</Text>
            </Pressable>

        </View>
    );
}