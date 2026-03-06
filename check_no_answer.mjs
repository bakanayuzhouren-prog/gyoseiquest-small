import { readFileSync } from 'fs';

const data = JSON.parse(readFileSync('temp_bukken_parsed.json', 'utf-8'));

// Q4 (index 3), Q8 (index 7), Q12 (index 11) を確認
[3, 7, 11].forEach(idx => {
    const q = data[idx];
    console.log(`\n=== Q${idx + 1} (Row${q.row}) ===`);
    console.log(`問題: ${q.text.substring(0, 80)}...`);
    q.choices.forEach((c, i) => {
        const hasR = c.text.includes('（ｒ）') || c.text.includes('(r)') || c.text.includes('（r）');
        console.log(`  肢${i + 1}${hasR ? ' ✅(r)' : ''}${c.isBonus ? ' [BONUS]' : ''}: ${c.text.substring(0, 60)}...`);
    });
});
