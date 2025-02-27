import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from './ui/button';

interface ExportPDF<T extends object> {
  data: T[];
  fileName: string;
}

function ExportToPDF<T extends object>({ data, fileName }: ExportPDF<T>) {
  const handleExport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(245, 245, 220);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
    doc.text('Grave Data', 14, 14);

    const tableColumns = Object.keys(data[0]) as (keyof T)[];

    const tableRows = data.map((item) =>
      tableColumns.map((key) => String(item[key])),
    );

    // Generate the table
    autoTable(doc, {
      startY: 40,
      head: [tableColumns.map(String)],
      body: tableRows,
      headStyles: {
        fillColor: [51, 51, 51],
        textColor: 255,
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return (
    <Button className="h-full" onClick={handleExport}>
      GENERATE PDF
    </Button>
  );
}

export { ExportToPDF };
