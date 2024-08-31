const ExcelJS = require("exceljs");

// [ exemple
//     { header: "DAYS", key: "DAYS", width: 20 },
//     { header: "HOURS", key: "HOURS", width: 40 },
//     { header: "DATE", key: "DATE", width: 35 },
//   ];
const getExcelHeaders = (headers) => {
  return headers.map((header) => {
    return {
      header: header,
      key: header,
      width: 20,
    };
  });
};

const exportToExcel = async (data, title, headers, wrapText) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);
  worksheet.columns = headers;
  data.forEach((row) => {
    const excelRow = worksheet.addRow(row);
    if (wrapText) {
      excelRow.eachCell((cell) => {
        cell.alignment = { wrapText: true, vertical: "top" };
      });
    }
  });
  const stream = new Stream.PassThrough();
  await workbook.xlsx.write(stream);
  stream.end();

  return stream;
};

module.exports = {
  getExcelHeaders,
  exportToExcel,
};
