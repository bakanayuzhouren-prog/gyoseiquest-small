require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set in environment.');
    process.exit(1);
}

// Retrying Lockheed and Zennorin (Failed in previous batch)
const diagrams = [
    {
        name: 'lockheed_scandal',
        title: 'ロッキード事件',
        // Slightly simplified narrative to try and pass filters/complexity check
        prompt_detail: '日本の判例「ロッキード事件」の図解。右側に「内閣総理大臣」、左側に「各省大臣」という青い箱がある。右から左へ矢印が伸び、「指揮監督権」と書かれている。下に赤字で「権限あり」とある。'
    },
    {
        name: 'zennorin_strike',
        title: '全農林警職法事件',
        // Slightly simplified narrative
        prompt_detail: '日本の判例「公務員の争議行為」についての図解。上に「公務員」の箱、下に矢印が伸びて「全体の奉仕者」の文字、一番下に「ストライキ禁止」の箱がある。青と白のシンプルなデザイン。'
    }
];

// Generate image using Gemini API
async function generateImage(diagram, index, total) {
    console.log(`\n[${index + 1}/${total}] Generating: ${diagram.title} (${diagram.name})`);

    // Single-line narrative prompt
    const prompt = `${diagram.prompt_detail} 文字はすべて日本語で、はっきりと読みやすく描画してください。手書き風ではなく、きれいに整ったデジタル画像にしてください。`;

    // Using Imagen 4.0 for image generation (Paid/Advanced tier)
    // Based on available models: models/imagen-4.0-generate-001
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;

    const requestBody = {
        instances: [{
            prompt: prompt
        }],
        parameters: {
            sampleCount: 1,
            aspectRatio: "3:4",
            personGeneration: "dont_allow"
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} ${response.statusText} - ${errText}`);
        }

        const data = await response.json();

        if (!data.predictions || data.predictions.length === 0) {
            // Check for error in response
            if (data.error) {
                throw new Error(`API Error: ${JSON.stringify(data.error)}`);
            }
            console.log('Response dump:', JSON.stringify(data, null, 2));
            throw new Error('No image generated in response');
        }

        // Extract base64 image data (Imagen API usually uses bytesBase64Encoded)
        const imageData = data.predictions[0].bytesBase64Encoded;
        if (!imageData) {
            console.log('Response dump:', JSON.stringify(data, null, 2));
            throw new Error('No image data in response (bytesBase64Encoded missing)');
        }

        // Save to file
        const outputPath = path.join(__dirname, '../assets/images', `${diagram.name}.png`);
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(outputPath, buffer);

        console.log(`✓ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(2)} KB)`);
        return true;
    } catch (error) {
        console.error(`✗ Failed to generate ${diagram.name}:`, error.message);
        return false;
    }
}

// Main execution
async function main() {
    console.log('='.repeat(60));
    console.log('判例図の生成を再開します (有料モード/API使用)');
    console.log('='.repeat(60));
    console.log(`Total diagrams to generate: ${diagrams.length}`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < diagrams.length; i++) {
        const success = await generateImage(diagrams[i], i, diagrams.length);

        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Wait a bit between requests
        if (i < diagrams.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('生成完了');
    console.log('='.repeat(60));
    console.log(`成功: ${successCount}`);
    console.log(`失敗: ${failCount}`);
    console.log(`合計: ${diagrams.length}`);
}

main().catch(console.error);
