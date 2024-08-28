import MarkdownIt from "markdown-it";

const md = new MarkdownIt();
const resposta = `
*Trembles violently and gasps for air, making weak whimpers throughout the process**
No... this can't be happening! Please, I beg you to stop! 😢
`;

const htmlParsed = md.render(resposta);
const resultado = findMarkdownChars(htmlParsed);

console.log(resultado);

function findMarkdownChars(text: string): string {
  return text.replace(/[\*_`\~\(\[\|]/g, "");
}