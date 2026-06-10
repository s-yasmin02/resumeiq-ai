const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (pdfBuffer) => {
  try {
    console.log("PDF Buffer Length:", pdfBuffer.length);

    const data = await pdfParse(pdfBuffer);

    console.log("Extracted Text Length:", data.text.length);

    return data.text;
  } catch (error) {
    console.error("FULL PDF ERROR:");
    console.error(error);

    throw new Error("Could not extract text from PDF");
  }
};

module.exports = {
  extractTextFromPDF,
};