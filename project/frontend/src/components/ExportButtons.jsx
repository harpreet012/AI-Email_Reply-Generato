import jsPDF from "jspdf";
import { FileText, Download, FileSpreadsheet } from "lucide-react";

const ExportButtons = ({ data = [] }) => {
  const exportCSV = () => {
    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const csv = [
      headers.join(","),
      ...data.map((item) =>
        headers.map((key) => `"${item[key] ?? ""}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "history.csv";
    link.click();
  };

  const exportTXT = () => {
    const txt = data.map((item) => JSON.stringify(item, null, 2)).join("\n\n");

    const blob = new Blob([txt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "history.txt";
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Email History", 20, 20);

    let y = 35;

    data.forEach((item, index) => {
      doc.setFontSize(12);

      doc.text(`${index + 1}. ${item.tone || ""}`, 20, y);

      y += 7;

      const text = (item.generatedReply || item.reply || "")
        .replace(/\n/g, " ")
        .slice(0, 140);

      doc.text(text, 20, y);

      y += 14;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("history.pdf");
  };

  const buttonClass = `
      flex
      items-center
      gap-2
      px-4
      py-2.5
      rounded-xl
      bg-white/10
      border
      border-white/20
      backdrop-blur-xl
      text-white
      hover:bg-white/20
      transition-all
      duration-300
    `;

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={exportCSV} className={buttonClass}>
        <FileSpreadsheet size={18} />
        CSV
      </button>

      <button onClick={exportTXT} className={buttonClass}>
        <FileText size={18} />
        TXT
      </button>

      <button onClick={exportPDF} className={buttonClass}>
        <Download size={18} />
        PDF
      </button>
    </div>
  );
};

export default ExportButtons;
