"use strict";
function cleanMarkdown(markdown) {
    // Split the markdown text into lines for processing
    const lines = markdown.split("\n");
    // Function to remove unmatched formatting characters
    const fixUnmatchedFormatting = (text) => {
        const boldPattern = /\*\*(.*?)\*\*/g;
        const italicPattern = /\*(.*?)\*/g;
        const boldUnderscorePattern = /__(.*?)__/g;
        const italicUnderscorePattern = /_(.*?)_/g;
        // Check for unmatched asterisks
        const unmatchedBold = text.match(/\*\*(?!.*?\*\*).*$/);
        const unmatchedItalic = text.match(/\*(?!.*?\*).*$/);
        // Check for unmatched underscores
        const unmatchedBoldUnderscore = text.match(/__(?!.*?__).*$/);
        const unmatchedItalicUnderscore = text.match(/_(?!.*?_).*$/);
        // Remove unmatched asterisks
        if (unmatchedBold) {
            text = text.replace(/\*\*(?!.*?\*\*)/g, "");
        }
        if (unmatchedItalic) {
            text = text.replace(/\*(?!.*?\*)/g, "");
        }
        // Remove unmatched underscores
        if (unmatchedBoldUnderscore) {
            text = text.replace(/__(?!.*?__)/g, "");
        }
        if (unmatchedItalicUnderscore) {
            text = text.replace(/_(?!.*?_)/g, "");
        }
        // Correctly match pairs
        text = text.replace(boldPattern, "**$1**");
        text = text.replace(italicPattern, "*$1*");
        text = text.replace(boldUnderscorePattern, "__$1__");
        text = text.replace(italicUnderscorePattern, "_$1_");
        return text;
    };
    // Process each line
    const cleanedLines = lines.map((line) => {
        // Remove any leading spaces for consistency
        line = line.trim();
        // Fix headers: ensure there's a space after hash symbols
        line = line.replace(/^(#+)(\S)/, (match, hashes, text) => {
            return `${hashes} ${text}`;
        });
        // Fix bold/italic: ensure matching asterisks/underscores
        line = fixUnmatchedFormatting(line);
        // Validate links: remove incorrect formatting
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            // Check for valid URL (basic check)
            try {
                new URL(url);
                return `[${text}](${url})`; // Valid link
            }
            catch (_a) {
                return text; // Invalid link, return just text
            }
        });
        // Validate images: same as links
        line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, url) => {
            // Check for valid URL
            try {
                new URL(url);
                return `![${altText}](${url})`; // Valid image
            }
            catch (_a) {
                return ""; // Invalid image, remove
            }
        });
        // Fix list items: ensure proper bullet points and numbering
        line = line.replace(/^(\*|\d+\.)\s+/, (match) => {
            return match.trim() + " ";
        });
        // Fix blockquotes: ensure proper '> ' format
        line = line.replace(/^>\s*/, "> ");
        // Return the cleaned line
        return line;
    });
    // Join the cleaned lines back into a single string
    return cleanedLines.join("\n");
}
// Example usage
const markdownText = `
  *Trembles violently and gasps for air, making weak whimpers throughout the process**
  No... this can't be happening! Please, I beg you to stop! 😢
  `;
console.log("Original Markdown:");
console.log(markdownText);
console.log("Cleaned Markdown:");
console.log(cleanMarkdown(markdownText));
