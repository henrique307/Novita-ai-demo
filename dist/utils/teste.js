"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTelegramMarkdown = removeTelegramMarkdown;
const markdown_it_1 = __importDefault(require("markdown-it"));
const md = new markdown_it_1.default();
const resposta = `
*Trembles violently and gasps for air, making weak whimpers throughout the process**
No... this can't be happening! Please, I beg you to stop! 😢
`;
const htmlParsed = md.render(resposta);
console.log(htmlParsed);
function removeTelegramMarkdown(text) {
    return text
        .replace(/(\*\*|__)(.*?)\1/g, '') // Negrito
        .replace(/(\*|_)(.*?)\1/g, '') // Itálico
        .replace(/`([^`]+)`/g, '') // Monospace
        .replace(/```([\s\S]*?)```/g, '') // Monospace com múltiplas linhas
        .replace(/~(.*?)~/g, '') // Subtexto
        .replace(/\[(.*?)\]\(.*?\)/g, '') // Hiperlink
        .replace(/\|\|(.*?)\|\|/g, ''); // Spoiler
}
