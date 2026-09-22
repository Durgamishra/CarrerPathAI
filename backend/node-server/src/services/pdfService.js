const fs = require("fs");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  const pdfBuffer = fs.readFileSync(filePath);

  const parser = new pdfParse.PDFParse({
    data: pdfBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
}

module.exports = {
  extractTextFromPDF,
};