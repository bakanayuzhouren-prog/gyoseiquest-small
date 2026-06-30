import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleProp, TextStyle, View } from 'react-native';
import { segmentDeepdiveTextForRender } from '@/utils/deepdive-tab-table';
import { normalizeMarkupForRender } from '@/utils/markup-tags';
import { ThemedText } from './themed-text';

type Props = {
    text: string;
    style?: StyleProp<TextStyle>;
    /** 登場人物・役割名の表示置換（A/B/C、連帯債務者A 等） */
    applyNames?: (text: string) => string;
    /** 赤字部分タップ時のコールバック。**text::tooltip** 形式のとき、tooltip を渡す */
    onHighlightPress?: (displayText: string, tooltip: string) => void;
    /** true のとき **太字**・赤字・ツールチップ表示を通常ウェイトに揃える（もっと深掘る等） */
    uniformWeight?: boolean;
    /** 行間（px）。未指定時は uniformWeight なら 4、そうでなければ 8 */
    lineGap?: number;
    /** `- 項目` 行を箇条書きとして字下げ・中黒表示 */
    bulletList?: boolean;
    /** 重要語を自動で赤字クリック化し、付近にミニ辞典を出す */
    autoGlossaryTerms?: boolean;
};

const defaultTextStyle = { lineHeight: 28, fontSize: 16 };
const BOLD_STYLE = { fontWeight: 'bold' as const };
const RED_HIGHLIGHT = { fontWeight: 'bold' as const, color: '#D32F2F' };
const GLOSSARY_TERMS = [
    ['目的効果基準', '政教分離の違憲審査で使われる判断枠組み。行為の目的に宗教的意義があるか、効果として特定宗教への援助・促進・圧迫になるかを見る。'],
    ['総合考慮', '一つの基準だけで機械的に決めず、施設の性格、経緯、利用状況、一般人の受け止め方など複数事情を合わせて判断すること。'],
    ['政教分離', '国や自治体が特定の宗教と過度に結びつかないようにする憲法上の原則。判例ごとに判断枠組みが変わる点が重要。'],
    ['公金支出', '国や自治体のお金を支出すること。宗教関係では、何のための支出か、特定宗教を援助する効果があるかが問われる。'],
    ['公有地の無償提供', '自治体などの土地を無償で使わせること。宗教施設に使われる場合、使用経緯や実態を総合して政教分離違反が問題になる。'],
    ['GPS捜査', 'GPS端末などで対象者の所在を継続的に把握する捜査。最高裁は強制処分に当たり得るとして、令状なしではできないとした。'],
    ['電話傍受', '通話内容を捜査機関が聴取・記録する捜査。令状は必要だが、通話一本ごとの個別令状までは不要と整理する。'],
    ['通信の秘密', '誰とどんな通信をしたか、通信内容が何かをみだりに知られない利益。電話傍受などで強く問題になる。'],
    ['強制処分', '相手の意思に反して重要な権利・利益を制約する捜査。原則として法律上の根拠と令状が必要になる。'],
    ['令状', '裁判官が捜査機関に対し、捜索・差押え・検証などを許可する書面。強制捜査の入口で問われる。'],
    ['裁判員制度', '重大刑事事件の第一審で、市民である裁判員と職業裁判官が一緒に審理・評議する制度。'],
    ['評決', '裁判員裁判で有罪・無罪や量刑を決める判断。単なる多数決ではなく、裁判官と裁判員の双方の意見を含む必要がある。'],
    ['特別会', '衆議院解散総選挙後に召集される国会。任期満了総選挙後は臨時会である点がひっかけ。'],
    ['臨時会', '必要がある場合に召集される国会。任期満了による衆議院総選挙後にも召集される。'],
    ['緊急集会', '衆議院解散中に国会の議決が必要な緊急事態で、参議院だけで開く制度。次の国会で衆議院の同意が必要。'],
    ['処分性', '行政庁の行為が、国民の権利義務や法的地位を直接具体的に変えるかという抗告訴訟の入口要件。'],
    ['訴えの利益', '裁判で取消しなどを求める実益が残っていること。後の事情で利益が消えると訴えは維持しにくい。'],
    ['抗告訴訟', '行政庁の処分や裁決などを争う行政事件訴訟。取消訴訟・無効等確認訴訟などがここに入る。'],
    ['事情判決', '処分は違法だが、取り消すと公の利益に著しい障害がある場合、違法を宣言しつつ請求を棄却する判決。'],
    ['執行停止', '取消訴訟などの係属中に、処分の効力や執行を一時的に止める制度。重大な損害を避ける必要性などを見る。'],
    ['審査請求', '行政庁の処分や不作為に対し、行政庁の内部ルートで不服を申し立てる手続。'],
    ['審理員', '審査請求で審理を担当する者。処分に関与していない者が手続を進めるのが原則。'],
    ['裁決', '審査請求に対する最終判断。却下、棄却、認容のどれかを場面に応じて区別する。'],
    ['聴聞', '重い不利益処分の前に、当事者へ意見陳述や証拠提出の機会を与える手続。'],
    ['弁明', '聴聞より簡易な不利益処分前の意見提出手続。原則として書面で行う。'],
    ['審査基準', '申請に対する処分で、許認可等をするかどうかを判断する基準。行政庁は原則として定めて公にする。'],
    ['標準処理期間', '申請が到達してから処分までに通常要する標準的な期間。定めた場合は公にする必要がある。'],
    ['行政指導', '行政機関が相手方の任意の協力を求める行為。許認可権限をちらつかせた事実上の強制がひっかけ。'],
    ['行政手続法', '処分前の手続、行政指導、届出、命令等制定手続などを定める法律。'],
    ['行政不服審査法', '行政庁の処分・不作為について、行政庁側に不服申立てをするルールを定める法律。'],
    ['行政事件訴訟法', '行政処分などを裁判所で争う訴訟のルールを定める法律。'],
    ['国家賠償', '公務員の違法行為や公の営造物の瑕疵によって損害が生じた場合に、国や公共団体が賠償する制度。'],
    ['損失補償', '適法な公権力行使で特別の犠牲を受けた人に、公平のため補償する制度。国家賠償との違いが重要。'],
    ['営造物', '道路、河川、公園など公の目的に使われる物的施設。設置管理の瑕疵が国賠2条で問題になる。'],
    ['瑕疵', '通常備えるべき安全性を欠くこと。営造物責任では、過失よりも安全性欠如が中心。'],
    ['住民監査請求', '住民が地方公共団体の財務会計行為について監査委員に監査を求める手続。住民訴訟の前置になる。'],
    ['住民訴訟', '住民監査請求を経た住民が、違法な財務会計行為について裁判所で争う訴訟。'],
    ['時効', '一定期間の経過により権利取得や権利消滅の効果が生じる制度。完成猶予・更新・援用を分ける。'],
    ['相殺', '互いに同種の債権を持つ者が、対当額で債権を消滅させる意思表示。自働債権・受働債権を見る。'],
    ['解除', '契約関係を解消する意思表示。催告解除、無催告解除、原状回復、損害賠償の関係が問われる。'],
    ['詐害行為取消', '債務者が責任財産を減らす行為をした場合、債権者が一定範囲で取り消せる制度。'],
    ['債権者代位', '債権者が自己の債権を保全するため、債務者の権利を代わりに行使する制度。'],
    ['保証', '主たる債務者が履行しない場合に、保証人が代わりに責任を負う制度。'],
    ['抵当権', '債務者などの不動産を担保に取り、占有を移さず、弁済がないとき優先弁済を受ける担保物権。'],
    ['法定地上権', '土地と建物が同一所有など一定要件を満たす場合、競売後に建物存続のため法律上当然に成立する地上権。'],
    ['地役権', '要役地の便益のために、他人の土地である承役地を一定範囲で利用できる物権。'],
    ['妨害排除請求', '物権などへの現在の妨害を取り除くよう求める請求。明渡しまで求められるかは別に検討する。'],
    ['明渡し', '占有している物を相手に引き渡すこと。妨害排除と混同しやすい。'],
    ['定款', '会社の基本ルール。会社法では、何を定款で定める必要があるかが頻出。'],
    ['株主総会', '株主で構成される会社の意思決定機関。取締役会設置会社かどうかで権限が変わる。'],
    ['取締役会', '取締役で構成される会社の業務執行決定機関。設置会社では株主総会との役割分担が重要。'],
    ['譲渡制限株式', '譲渡に会社の承認が必要な株式。非公開会社や相続人への売渡請求などと絡めて問われる。'],
    ['種類株式', '剰余金配当、議決権、取得請求など内容の異なる株式。定款で何を定めるかがポイント。'],
    ['個人情報保護法', '生存する個人に関する情報の取扱い、開示・訂正・利用停止などを定める法律。'],
    ['情報公開', '行政機関などが保有する文書について、開示請求と非開示情報のルールを定める制度。'],
] as const;

type GlossaryTerm = (typeof GLOSSARY_TERMS)[number];
const GLOSSARY_TERMS_SORTED: readonly GlossaryTerm[] = [...GLOSSARY_TERMS].sort((a, b) => b[0].length - a[0].length);

type LinePart =
    | { type: 'plain'; text: string }
    | { type: 'bold'; text: string }
    | { type: 'red'; text: string }
    | { type: 'tooltip'; text: string; tooltip?: string }
    | { type: 'glossary'; text: string; tooltip: string }
    | { type: 'color'; color: string; bold?: boolean; children: LinePart[] };

function parseLine(line: string): LinePart[] {
    const parts: LinePart[] = [];
    let rest = line;
    while (rest.length > 0) {
        const redMatch = rest.match(/^\[\[red:([\s\S]+?)\]\]/);
        if (redMatch) {
            parts.push({ type: 'red', text: redMatch[1] });
            rest = rest.slice(redMatch[0].length);
            continue;
        }
        const colorOpen = rest.match(/^\[\[c:#([0-9a-fA-F]{6})(&b)?\]\]/);
        if (colorOpen) {
            rest = rest.slice(colorOpen[0].length);
            const closeIdx = rest.indexOf('[[/c]]');
            if (closeIdx >= 0) {
                const inner = rest.slice(0, closeIdx);
                rest = rest.slice(closeIdx + '[[/c]]'.length);
                parts.push({
                    type: 'color',
                    color: `#${colorOpen[1].toLowerCase()}`,
                    bold: !!colorOpen[2],
                    children: parseLine(inner),
                });
                continue;
            }
            parts.push({ type: 'plain', text: colorOpen[0] });
            continue;
        }
        const boldMatch = rest.match(/^(\*\*)(.+?)\*\*/);
        if (boldMatch) {
            const inner = boldMatch[2];
            const sep = inner.indexOf('::');
            if (sep >= 0) {
                parts.push({ type: 'tooltip', text: inner.slice(0, sep), tooltip: inner.slice(sep + 2) });
            } else if (/\[\[red:|\[\[c:#/.test(inner)) {
                parts.push(...parseLine(inner));
            } else {
                parts.push({ type: 'bold', text: inner });
            }
            rest = rest.slice(boldMatch[0].length);
            continue;
        }
        const nextRed = rest.indexOf('[[red:');
        const nextColor = rest.indexOf('[[c:#');
        const nextBold = rest.indexOf('**');
        let end = rest.length;
        const candidates = [nextRed, nextColor, nextBold].filter((n) => n >= 0);
        if (candidates.length > 0) end = Math.min(...candidates);
        if (end > 0) parts.push({ type: 'plain', text: rest.slice(0, end) });
        rest = rest.slice(end);
        if (end === 0 && rest.startsWith(']]')) {
            rest = rest.slice(2);
        }
        if (end === 0 && rest.startsWith('[[red:')) {
            rest = rest.slice(6);
        }
        if (end === 0 && rest.startsWith('**')) {
            parts.push({ type: 'plain', text: '**' });
            rest = rest.slice(2);
            continue;
        }
    }
    return parts;
}

function splitTextByGlossary(text: string, plainType: 'plain' | 'bold'): LinePart[] {
    const out: LinePart[] = [];
    let cursor = 0;
    while (cursor < text.length) {
        let best: { index: number; term: GlossaryTerm } | null = null;
        for (const term of GLOSSARY_TERMS_SORTED) {
            const index = text.indexOf(term[0], cursor);
            if (index < 0) continue;
            if (!best || index < best.index || (index === best.index && term[0].length > best.term[0].length)) {
                best = { index, term };
            }
        }
        if (!best) {
            const tail = text.slice(cursor);
            if (tail) out.push({ type: plainType, text: tail });
            break;
        }
        if (best.index > cursor) {
            out.push({ type: plainType, text: text.slice(cursor, best.index) });
        }
        out.push({ type: 'glossary', text: best.term[0], tooltip: best.term[1] });
        cursor = best.index + best.term[0].length;
    }
    return out;
}

function applyGlossaryTerms(parts: LinePart[], enabled?: boolean): LinePart[] {
    if (!enabled) return parts;
    return parts.flatMap((p): LinePart[] => {
        if (p.type === 'plain' || p.type === 'bold') {
            return splitTextByGlossary(p.text, p.type);
        }
        if (p.type === 'color') {
            return [{ ...p, children: applyGlossaryTerms(p.children, enabled) }];
        }
        return [p];
    });
}
function renderLineParts(
    parsed: LinePart[],
    lineStyle: StyleProp<TextStyle>,
    onHighlightPress: Props['onHighlightPress'],
    keyPrefix: string,
    uniformWeight?: boolean,
    onGlossaryPress?: (displayText: string, tooltip: string) => void
): ReactNode[] {
    return parsed.map((p, partIndex) => {
        const key = `${keyPrefix}-${partIndex}`;
        const redOnly = uniformWeight ? { color: RED_HIGHLIGHT.color } : RED_HIGHLIGHT;
        const redType = uniformWeight ? 'default' : 'defaultSemiBold';
        if (p.type === 'red') {
            return (
                <ThemedText key={key} type={redType} style={[lineStyle, redOnly]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'bold') {
            return (
                <ThemedText key={key} type="default" style={uniformWeight ? lineStyle : [lineStyle, BOLD_STYLE]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'glossary') {
            return (
                <ThemedText
                    key={key}
                    type={redType}
                    onPress={() => onGlossaryPress?.(p.text, p.tooltip)}
                    accessibilityRole="button"
                    accessibilityLabel={`${p.text}の意味を表示`}
                    style={[lineStyle, redOnly, { textDecorationLine: 'underline', textDecorationStyle: 'dotted' }]}
                >
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'tooltip' && p.tooltip && onHighlightPress) {
            return (
                <Pressable
                    key={key}
                    onPress={() => onHighlightPress(p.text, p.tooltip!)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, alignSelf: 'baseline' })}
                >
                    <ThemedText type={redType} style={[lineStyle, redOnly]}>
                        {p.text}
                    </ThemedText>
                </Pressable>
            );
        }
        if (p.type === 'tooltip') {
            return (
                <ThemedText key={key} type={redType} style={[lineStyle, redOnly]}>
                    {p.text}
                </ThemedText>
            );
        }
        if (p.type === 'color') {
            const colorStyle: StyleProp<TextStyle> = [lineStyle, { color: p.color }, p.bold && !uniformWeight ? BOLD_STYLE : null];
            return (
                <ThemedText key={key} type="default" style={colorStyle}>
                    {renderLineParts(p.children, lineStyle, onHighlightPress, `${key}-c`, uniformWeight, onGlossaryPress)}
                </ThemedText>
            );
        }
        return (
            <ThemedText key={key} style={lineStyle}>
                {p.text}
            </ThemedText>
        );
    });
}

/** 参照（成田新法事件タイプ）：無罫線・白・列間のみ広げる・ヘッダ行も本文と同じ字 */
const TABLE_ROW_BG = '#FFFFFF';
const TABLE_TEXT_COLOR = '#0F172A';
const TABLE_CELL_PAD = { paddingVertical: 2, paddingHorizontal: 0 };
/** Web・ネイティブ共通の列間（display:table は使わず flex で統一） */
const TABLE_COLUMN_GAP = Platform.OS === 'web' ? 32 : 24;
const TABLE_ROW_GAP_WEB_PX = 2;

/** 3列：左ラベル狭め・中央本文・右は判定（短文〜中くらいまで想定） */
const FLEX_3_COL_PROJECT = [1, 3.35, 1.45];
const FLEX_2_COL = [1, 2.35];
/** 4列（数字・要件表など）：制度・数字・請求先・条文 */
const FLEX_4_COL_NUMBERS = [1.35, 1.1, 0.95, 0.7];

function columnFlexWeights(colCount: number): number[] {
    if (colCount === 4) return FLEX_4_COL_NUMBERS;
    if (colCount === 3) return FLEX_3_COL_PROJECT;
    if (colCount === 2) return FLEX_2_COL;
    return Array(colCount).fill(1);
}

function minWidthForColumn(colCount: number, colIndex: number): number | undefined {
    if (colCount !== 3) return undefined;
    const m = [88, 112, 92];
    return m[colIndex];
}

const BULLET_LINE_RE = /^-\s+(.*)$/;

function MarkdownPlainBlock({
    text,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    bulletList,
    keyPrefix,
    autoGlossaryTerms,
}: {
    text: string;
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    bulletList?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    const lines = normalizeMarkupForRender(text).split('\n');
    const [activeGlossary, setActiveGlossary] = useState<{ lineIndex: number; title: string; body: string } | null>(null);
    const toggleGlossary = (lineIndex: number, title: string, body: string) => {
        setActiveGlossary((prev) =>
            prev && prev.lineIndex === lineIndex && prev.title === title ? null : { lineIndex, title, body }
        );
    };
    const renderGlossaryBubble = (lineIndex: number) =>
        activeGlossary?.lineIndex === lineIndex ? (
            <View style={{ borderLeftWidth: 3, borderLeftColor: '#D32F2F', backgroundColor: '#FFF5F5', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 10 }}>
                <ThemedText type="defaultSemiBold" style={{ color: '#B91C1C', fontSize: 14, lineHeight: 20 }}>{activeGlossary.title}</ThemedText>
                <ThemedText style={{ color: '#3F1F1F', fontSize: 14, lineHeight: 21 }}>{activeGlossary.body}</ThemedText>
            </View>
        ) : null;
    return (
        <View style={{ gap: lineGap, width: '100%', alignSelf: 'stretch' }}>
            {lines.map((line, lineIndex) => {
                const bulletMatch = bulletList ? BULLET_LINE_RE.exec(line) : null;
                const displayLine = bulletMatch ? bulletMatch[1] : line;
                if (!displayLine.trim()) return null;
                const parsed = applyGlossaryTerms(parseLine(displayLine), autoGlossaryTerms);
                const parts = renderLineParts(
                    parsed,
                    lineStyle,
                    onHighlightPress,
                    `L${keyPrefix}-${lineIndex}`,
                    uniformWeight,
                    autoGlossaryTerms ? (title, body) => toggleGlossary(lineIndex, title, body) : undefined
                );
                if (bulletMatch) {
                    return (
                        <View key={`${keyPrefix}-${lineIndex}`} style={{ width: '100%', alignSelf: 'stretch', gap: 6 }}>
                            <ThemedText
                                style={[
                                    lineStyle,
                                    {
                                        width: '100%',
                                        alignSelf: 'stretch',
                                        ...(Platform.OS === 'web'
                                            ? ({ display: 'block' } as unknown as TextStyle)
                                            : null),
                                    },
                                ]}
                            >
                                {'• '}
                                {parts}
                            </ThemedText>
                            {renderGlossaryBubble(lineIndex)}
                        </View>
                    );
                }
                return (
                    <View key={`${keyPrefix}-${lineIndex}`} style={{ width: '100%', alignSelf: 'stretch', gap: 6 }}>
                        <ThemedText
                            style={[
                                lineStyle,
                                {
                                    width: '100%',
                                    alignSelf: 'stretch',
                                    ...(Platform.OS === 'web'
                                        ? ({ display: 'block' } as unknown as TextStyle)
                                        : null),
                                },
                            ]}
                        >
                            {parts}
                        </ThemedText>
                        {renderGlossaryBubble(lineIndex)}
                    </View>
                );
            })}
        </View>
    );
}

/** セル内のプレーン＋ネスト表（MarkdownText と同等だが循環参照しない） */
function DeepdiveRichSegments({
    text,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    bulletList,
    keyPrefix,
    autoGlossaryTerms,
}: {
    text: string;
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    bulletList?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    const segments = segmentDeepdiveTextForRender(text);
    return (
        <View style={{ gap: lineGap, width: '100%', alignSelf: 'stretch' }}>
            {segments.map((seg, si) => {
                if (seg.type === 'plain') {
                    const t = seg.text;
                    if (!t.trim()) return null;
                    return (
                        <MarkdownPlainBlock
                            key={`${keyPrefix}-p-${si}`}
                            text={t}
                            lineStyle={lineStyle}
                            lineGap={lineGap}
                            onHighlightPress={onHighlightPress}
                            uniformWeight={uniformWeight}
                            bulletList={bulletList}
                            keyPrefix={`${keyPrefix}-p-${si}`}
                            autoGlossaryTerms={autoGlossaryTerms}
                        />
                    );
                }
                return (
                    <MarkdownTabTable
                        key={`${keyPrefix}-t-${si}`}
                        rows={seg.rows}
                        lineStyle={lineStyle}
                        lineGap={lineGap}
                        onHighlightPress={onHighlightPress}
                        uniformWeight={uniformWeight}
                        keyPrefix={`${keyPrefix}-t-${si}`}
                    />
                );
            })}
        </View>
    );
}

function MarkdownTabTable({
    rows,
    lineStyle,
    lineGap,
    onHighlightPress,
    uniformWeight,
    keyPrefix,
    autoGlossaryTerms,
}: {
    rows: string[][];
    lineStyle: StyleProp<TextStyle>;
    lineGap: number;
    onHighlightPress: Props['onHighlightPress'];
    uniformWeight?: boolean;
    keyPrefix: string;
    autoGlossaryTerms?: boolean;
}) {
    if (rows.length === 0) return null;
    const colCount = rows.reduce((m, r) => Math.max(m, r.length), 0);
    const weights = columnFlexWeights(colCount);

    /** 先頭行もデータ行も同一（参照：太字・下線・ヘッダ背景なし）。サイズは親のカード本文に追随 */
    const headerLineStyle: StyleProp<TextStyle> = [
        lineStyle,
        {
            color: TABLE_TEXT_COLOR,
            fontWeight: '400' as const,
        },
    ];

    /** Web でも display:table は RN Web で不安定なことがあるため、ネイティブと同一の flex 行で描画する */
    return (
        <View
            style={{
                alignSelf: 'stretch',
                width: '100%',
                borderWidth: 0,
                backgroundColor: TABLE_ROW_BG,
                gap: TABLE_ROW_GAP_WEB_PX,
            }}
        >
            {rows.map((cells, ri) => {
                const rowBg = TABLE_ROW_BG;
                return (
                    <View
                        key={`${keyPrefix}-row-${ri}`}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            alignItems: 'flex-start',
                            gap: TABLE_COLUMN_GAP,
                            backgroundColor: rowBg,
                        }}
                    >
                        {cells.map((cell, ci) => {
                            const w = weights[ci] ?? 1;
                            const mw = minWidthForColumn(colCount, ci);
                            const isFirstCol = ci === 0;
                            return (
                                <View
                                    key={`${keyPrefix}-cell-${ri}-${ci}`}
                                    style={{
                                        flex: w,
                                        flexBasis: 0,
                                        flexShrink: colCount >= 2 && isFirstCol ? 0 : 1,
                                        minWidth: mw ?? 0,
                                        maxWidth: '100%',
                                        paddingVertical: TABLE_CELL_PAD.paddingVertical,
                                        paddingHorizontal: TABLE_CELL_PAD.paddingHorizontal,
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <DeepdiveRichSegments
                                        text={cell}
                                        lineStyle={headerLineStyle}
                                        lineGap={Math.min(lineGap, 4)}
                                        onHighlightPress={onHighlightPress}
                                        uniformWeight={uniformWeight}
                                        keyPrefix={`${keyPrefix}-c-${ri}-${ci}`}
                                        autoGlossaryTerms={autoGlossaryTerms}
                                    />
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

export function MarkdownText({ text, style, applyNames, onHighlightPress, uniformWeight, lineGap: lineGapProp, bulletList, autoGlossaryTerms }: Props) {
    if (!text) return null;

    const displayText = applyNames ? applyNames(text) : text;

    const lineStyle = style ? [defaultTextStyle, style] : defaultTextStyle;
    const lineGap = lineGapProp ?? (uniformWeight ? 4 : 8);

    return (
        <DeepdiveRichSegments
            text={displayText}
            lineStyle={lineStyle}
            lineGap={lineGap}
            onHighlightPress={onHighlightPress}
            uniformWeight={uniformWeight}
            bulletList={bulletList}
            keyPrefix="md"
            autoGlossaryTerms={autoGlossaryTerms}
        />
    );
}
