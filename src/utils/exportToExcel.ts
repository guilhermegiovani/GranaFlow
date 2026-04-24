//import { documentDirectory } from "expo-file-system";
//import * as FileSystem from "expo-file-system";
//import { writeAsStringAsync } from "expo-file-system/legacy";
import * as FileSystem from "expo-file-system/legacy";
import { shareAsync } from "expo-sharing";
import * as XLSX from "xlsx";
// Importa o tipo Expense para validação de tipos
import { Expense } from "../types/index";

// Função para exportar gastos em Excel
// expenses: Expense[] = recebe um array tipado de Expense (TypeScript valida!)
// Promise<void> = é assíncrona e não retorna nada
export const exportToExcel = async (expenses: Expense[]): Promise<void> => {
  try {
    // VALIDAÇÃO: Verifica se tem gastos para exportar
    if (expenses.length === 0) {
      alert("Nenhum gasto para exportar!");
      return;
    }

    // CÁLCULO: Separa ganhos e gastos
    // filter(e => e.type === "income") = pega só os ganhos
    // reduce((sum, e) => sum + e.value, 0) = soma todos os valores
    const totalIncome: number = expenses
      .filter((e: Expense) => e.type === "income")
      .reduce((sum: number, e: Expense) => sum + e.value, 0);

    // CÁLCULO: Total de gastos
    const totalExpense: number = expenses
      .filter((e: Expense) => e.type === "expense")
      .reduce((sum: number, e: Expense) => sum + e.value, 0);

    // CÁLCULO: Lucro = Ganhos - Gastos
    const profit: number = totalIncome - totalExpense;

    // FORMATAÇÃO: Prepara os dados para o Excel
    // map transforma cada Expense em um objeto formatado
    interface FormattedExpense {
      Data: string;
      Hora: string;
      Descrição: string;
      Categoria: string;
      Valor: number;
      Tipo: string;
    }

    const formattedData: FormattedExpense[] = expenses.map(
      (expense: Expense) => ({
        Data: new Date(expense.date).toLocaleDateString("pt-BR"),
        Hora: new Date(expense.date).toLocaleTimeString("pt-BR"),
        Descrição: expense.description,
        Categoria: expense.category,
        Valor: expense.value,
        Tipo: expense.type === "income" ? "Ganho" : "Gasto",
      })
    );

    // CRIAÇÃO: Cria um novo workbook (arquivo Excel)
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");

    // DIMENSIONAMENTO: Ajusta largura das colunas
    const columnWidths = [
      { wch: 12 }, // Data
      { wch: 12 }, // Hora
      { wch: 25 }, // Descrição
      { wch: 15 }, // Categoria
      { wch: 12 }, // Valor
      { wch: 10 }, // Tipo
    ];
    worksheet["!cols"] = columnWidths;

    // RESUMO: Adiciona linha com totais
    const summaryStartRow: number = formattedData.length + 3;
    worksheet[`A${summaryStartRow}`] = "RESUMO";
    worksheet[`A${summaryStartRow + 1}`] = "Total Ganho:";
    worksheet[`B${summaryStartRow + 1}`] = totalIncome;
    worksheet[`A${summaryStartRow + 2}`] = "Total Gasto:";
    worksheet[`B${summaryStartRow + 2}`] = totalExpense;
    worksheet[`A${summaryStartRow + 3}`] = "LUCRO LÍQUIDO:";
    worksheet[`B${summaryStartRow + 3}`] = profit;

    // NOMEAÇÃO: Cria nome do arquivo com data atual
    // toLocaleDateString gera string como "21/04/2026"
    // replace(/\//g, "-") troca "/" por "-" para valid file name
    const fileName: string = `Gastos_${new Date()
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}.xlsx`;

    // EXPORTAÇÃO: Salva arquivo Excel no dispositivo mobile
    // GERAÇÃO: Converte o workbook para buffer (dados binários)
    const wbout: string = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    // SALVAMENTO: Usa documentDirectory interno do app
    // Esse caminho tem permissão garantida no Expo Go
    //const fileUri = `${documentDirectory}${fileName}`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    console.log("URI:", fileUri);

    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: "base64",
    });

    // Compartilha o arquivo usando o share sheet do dispositivo
    await shareAsync(fileUri, {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      dialogTitle: `Compartilhar ${fileName}`,
    });

    alert(`Arquivo "${fileName}" salvo no armazenamento interno do app e pronto para compartilhamento!`);
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
    alert("Erro ao exportar arquivo");
  }
};
