const pdfParse = require("pdf-parse");

async function extractTextFromPDF(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);

  return data.text;
}

module.exports = {
  extractTextFromPDF,
};