import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as XLSX from "xlsx";
import { ExpensesContextType } from "@/src/types/index";

export const importFromExcel = async (importExpenses: ExpensesContextType["importExpenses"]) => {
    // Implementation for importing data from Excel
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            if (result.canceled) {
                return;
            }

            const assetsBase64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: "base64" });

            const workbook = XLSX.read(assetsBase64, { type: "base64" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const dataJson = XLSX.utils.sheet_to_json(worksheet);

            const importedExpenses = dataJson.map((value: any, index) => {
                const day = value.Data.split("/")[0].padStart(2, "0");
                const month = value.Data.split("/")[1].padStart(2, "0");
                const year = value.Data.split("/")[2];
                const formattedDate = `${year}-${month}-${day}`;
                const date = new Date(formattedDate + "T" + value.Hora).toISOString();

                return {
                    id: Date.now() + index, // Gera um ID único usando a data e o índice
                    description: value.Descrição,
                    category: value.Categoria,
                    value: value.Valor,
                    type: value.Tipo === "Ganho"
                        ? ("income" as const)
                        : ("expense" as const),
                    date: date
                };
            });

            await importExpenses(importedExpenses);


        } catch (error) {
            console.error("Error picking document:", error);
        }

    }

    await pickDocument();
};