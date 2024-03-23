import OpenAI from "openai";

const openai = new OpenAI();

export default class AI {
  constructor(readonly model: string) {}

  private async _api(content: string) {
    const chat = await openai.chat.completions.create({
      model: this.model,
      temperature: 0,
      messages: [{ role: "user", content }],
    });
    return chat.choices[0].message.content;
  }

  async simplify(text: string) {
    const prompt = `
    Please rewrite the text in the HTML as if you were a world renowned teacher trying to help a student understand the subject matter

    **DO NOT** change the structure of the HTML, only the text content. Do not remove images, tables, or any other elements.
    **ONLY** respond with the HTML content.

    \`\`\`
    ${text}
    \`\`\`
    `;

    const translation = await this._api(prompt);
    return translation ?? "No translation available.";
  }
}
