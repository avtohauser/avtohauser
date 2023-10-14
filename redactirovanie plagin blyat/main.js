const axios = require('axios');

module.exports = class OpenAIPlugin {
    constructor() {
        this.id = 'openai-plugin';
        this.name = 'OpenAI Plugin for Obsidian';
    }

    async onload() {
        this.addCommand({
            id: 'process-text',
            name: 'Process Selected Text with OpenAI',
            callback: this.processText.bind(this)
        });
    }

    async processText() {
        const selectedText = this.app.workspace.activeLeaf.view.editor.getSelection();
        if (!selectedText) return;

        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
                prompt: selectedText,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json'
                }
            });

            const newText = response.data.choices[0].text.trim();
            this.app.workspace.activeLeaf.view.editor.replaceSelection(newText);
        } catch (error) {
            console.error('Error processing text with OpenAI:', error);
        }
    }
};
