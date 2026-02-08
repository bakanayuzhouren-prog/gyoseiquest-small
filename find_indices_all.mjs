import { SUBJECTS } from './src/questions.js';

const minpo = SUBJECTS["民法"];

const targets = [
    "養子縁組は、当事者間に縁組をする意思がないときは無効",
    "一般社団法人の設立に際して、法人設立のために行われた虚偽表示は無効",
    "土地の仮装譲受人と当該土地に建てられた建物の善意の賃借人は第三者の関係にあたらない",
    "仮装債権を善意で譲り受けた者は第三者に当たる",
    "善意で仮装金銭消費貸借の債権を譲り受けた者"
];

console.log("Searching for question indices in all Civil Law categories:");

targets.forEach(target => {
    let found = false;
    for (const [category, questions] of Object.entries(minpo)) {
        const index = questions.findIndex(q => q.text.includes(target));
        if (index !== -1) {
            console.log(`Topic: ${target.substring(0, 30)}... -> Category: ${category}, Index: ${index}`);
            found = true;
            // Note: In reference page lookup, it iterates through all categories.
        }
    }
    if (!found) {
        console.log(`Topic: ${target.substring(0, 30)}... -> NOT FOUND`);
    }
});
