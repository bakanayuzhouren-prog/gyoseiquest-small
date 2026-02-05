export type LineChat = {
    id: string;
    speaker: string;
    message: string;
    keywords: string[];
};

export const LINE_HISTORY: LineChat[] = [
    {
        id: 'chat_001',
        speaker: 'ちばまぞこ',
        message: 'よい友達ができたわぃ',
        keywords: ['友達']
    },
    {
        id: 'chat_002',
        speaker: 'てらしぃ',
        message: '僕がグレてこうなっても友達でいて下さい　笑',
        keywords: ['グレて', '友達']
    },
    {
        id: 'chat_003',
        speaker: 'てらしぃ',
        message: 'このキャラとたこゆきくんどっちが営業に向いてますかね？笑',
        keywords: ['営業', 'たこゆきくん', 'キャラ']
    },
    {
        id: 'chat_004',
        speaker: 'ちばまぞこ',
        message: 'たこゆきくんの水商売営業とコスプレ営業？',
        keywords: ['水商売', 'コスプレ', '営業']
    },
    {
        id: 'chat_005',
        speaker: 'てらしぃ',
        message: 'この感じでコスプレ営業するのが、コンカフェじゃないんですか？笑',
        keywords: ['コンカフェ', 'コスプレ']
    },
    {
        id: 'chat_006',
        speaker: 'ちばまぞこ',
        message: 'ひよこ刈りの相談してて笑った そのせんせーがひよこ刈りします！',
        keywords: ['ひよこ刈り', '先生']
    },
    {
        id: 'chat_007',
        speaker: 'てらしぃ',
        message: '風呂キャンして下さいよー、、、',
        keywords: ['風呂キャン']
    },
    {
        id: 'chat_008',
        speaker: 'ちばまぞこ',
        message: '家の中で盛大にコケましたわ笑',
        keywords: ['コケ', '怪我']
    },
    {
        id: 'chat_009',
        speaker: 'ちばまぞこ',
        message: '涙狙ってる これは合格や',
        keywords: ['合格', '涙', 'くま']
    },
    {
        id: 'chat_010',
        speaker: 'てらしぃ',
        message: '合格確定なので、もう勉強しなくていいです アプリも作りません',
        keywords: ['合格確定', '勉強', 'アプリ']
    },
    {
        id: 'chat_011',
        speaker: 'てらしぃ',
        message: '高校の先生です 相田理恵先生',
        keywords: ['高校', '先生', '相田']
    },
    {
        id: 'chat_012',
        speaker: 'てらしぃ',
        message: '娘が合格率高いと報告してきました　笑 14%超えてると！',
        keywords: ['合格率', '娘']
    },
    {
        id: 'chat_013',
        speaker: 'ちばまぞこ',
        message: 'せんせーが20%いくとかX情報でホラ吹いてたけど笑',
        keywords: ['合格率', 'X情報', 'ホラ']
    },
    {
        id: 'chat_014',
        speaker: 'てらしぃ',
        message: '試験として崩壊してますやん　笑 人数で言うと、1000人も合格者が多いとか',
        keywords: ['試験崩壊', '合格者']
    },
    {
        id: 'chat_015',
        speaker: 'てらしぃ',
        message: '憲法を厳しくしてくる事は確定！',
        keywords: ['憲法', '難化']
    },
    {
        id: 'chat_016',
        speaker: 'ちばまぞこ',
        message: '苦しい戦いの方がいい もえるわ〜',
        keywords: ['戦い', 'ドM']
    },
    {
        id: 'chat_017',
        speaker: 'てらしぃ',
        message: '僕は変態じゃない 猫とモグラを見間違えるだけ',
        keywords: ['変態', 'モグラ', '猫']
    },
    {
        id: 'chat_018',
        speaker: 'ちばまぞこ',
        message: '今日は確定申告と月末締め切りの仕事します',
        keywords: ['確定申告', '仕事']
    },
    {
        id: 'chat_019',
        speaker: 'てらしぃ',
        message: '行きつけの美容師さんが、チャットGPT使ったら、確定申告めっちゃ楽になったって言ってました！',
        keywords: ['チャットGPT', '確定申告']
    },
    {
        id: 'chat_020',
        speaker: 'てらしぃ',
        message: '有益費が答えらしいっすよ！',
        keywords: ['有益費', '答え']
    },
    {
        id: 'chat_021',
        speaker: 'ちばまぞこ',
        message: '緊急事務管理は出てきたけど 有益費どうだったかなぁ',
        keywords: ['緊急事務管理', '有益費']
    },
    {
        id: 'chat_022',
        speaker: 'てらしぃ',
        message: '問題文に通常の費用って書いてあったはず！',
        keywords: ['通常費', '通常の費用', '問題文']
    },
    {
        id: 'chat_023',
        speaker: 'ちばまぞこ',
        message: '今は行政法は過去問中心ですね 民法がもう少しで終わるので',
        keywords: ['行政法', '民法', '過去問']
    },
    {
        id: 'chat_024',
        speaker: 'てらしぃ',
        message: '近々、アプリを一般公開しますので、見て聞いて解くモードの確認をしてもらいたいです！',
        keywords: ['アプリ', '公開', '確認']
    },
    {
        id: 'chat_025',
        speaker: 'てらしぃ',
        message: '今行政法総論の最終チェックしてます！adhdは、抜けが多いので、子犬を助けるような気持ちで、僕を助けてください！笑',
        keywords: ['行政法総論', 'ADHD', 'チェック']
    },
    {
        id: 'chat_026',
        speaker: 'ちばまぞこ',
        message: 'トイレ行ってる間に寺島さんからLINEがあって、ドキドキしたわー ハガキ来たのかとおもった笑',
        keywords: ['LINE', 'ハガキ', 'ドキドキ']
    },
    {
        id: 'chat_027',
        speaker: 'てらしぃ',
        message: '二点を死守する試合・・・',
        keywords: ['二点', '死守']
    },
    {
        id: 'chat_028',
        speaker: 'ちばまぞこ',
        message: 'ハガキ来ても読まずに食べちゃだめよ',
        keywords: ['ハガキ', '食べる']
    },
    {
        id: 'chat_029',
        speaker: 'ちばまぞこ',
        message: 'もう寺島家前で郵便屋さんを待ちたい',
        keywords: ['郵便屋', '待つ']
    },
    {
        id: 'chat_030',
        speaker: 'てらしぃ',
        message: 'ダイヤのＡの主人公のチームには、四人のピッチャーがいるんですよ',
        keywords: ['ダイヤのA', 'ピッチャー']
    },
    {
        id: 'chat_031',
        speaker: 'てらしぃ',
        message: '剛腕降谷:ちばみほこ、クセのあるサウスポー:僕、サイドスローのリリーフ:まみさん',
        keywords: ['降谷', '沢村', '川上', 'ちばみほこ', 'まみさん']
    },
    {
        id: 'chat_032',
        speaker: 'てらしぃ',
        message: '行政書士試験は、秋の大会です　笑',
        keywords: ['行政書士試験', '秋の大会']
    },
    {
        id: 'chat_033',
        speaker: 'てらしぃ',
        message: '娘の大学でも、教授がアプリ作成について教えてくれるらしいのですが、ぼくより知識無いそうで・・・・',
        keywords: ['娘', '大学', '教授', 'アプリ']
    },
    {
        id: 'chat_034',
        speaker: 'ちばまぞこ',
        message: 'すごいのはわかる！だが字が小さくて笑 なるほど！関連ポイントもまとめてあっていいね！',
        keywords: ['字が小さい', '関連ポイント']
    },
    {
        id: 'chat_035',
        speaker: 'てらしぃ',
        message: 'これくらいどんと構えてないと、インコースの厳しいところに投げられないし、彼氏できないですよ　笑',
        keywords: ['インコース', '彼氏']
    },
    {
        id: 'chat_036',
        speaker: 'てらしぃ',
        message: '今日は、ハガキ着ませんね 別なのが着ました',
        keywords: ['ハガキ', '別なの']
    }
];
