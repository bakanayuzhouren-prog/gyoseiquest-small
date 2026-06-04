/** 深掘りから開くチャンク（モーダル）用ペイロード */
export type DeepdiveImageHotspot = {
  id: string;
  label: string;
  chunkImage: string;
  statuteTitle?: string;
  statuteMarkdown?: string;
};

const SOUSOKU602_MARKDOWN = `[[section:民法602条（短期賃貸借）]]
処分権限のない者が賃貸借する場合、次の期間を**超えることができない**（契約で長くても短くなる）。

| 種類 | 最長 |
|------|------|
| 山林（栽植・伐採） | **10年** |
| その他の土地 | **5年** |
| 建物 | **3年** |
| 動産 | **6ヶ月** |

[[marker:13条9号との関係]]
保佐人の同意が要る「602条に定める期間を超える賃貸借」＝上表を超える契約のこと。`;

const DEEPDIVE_IMAGE_HOTSPOTS: Record<string, DeepdiveImageHotspot[]> = {
  'learn/minnpou/2-87': [
    {
      id: '602',
      label: '602条（長期賃貸借の期間）をチャンクで見る',
      chunkImage: 'minnpou/sousoku/sousoku602',
      statuteTitle: '第六百二条（短期賃貸借）',
      statuteMarkdown: SOUSOKU602_MARKDOWN,
    },
  ],
};

/** 13条図（learn/minnpou/2-87）→ 602条チャンク表示用 */
export function getMinpo13Article602Hotspot(): DeepdiveImageHotspot | undefined {
  return DEEPDIVE_IMAGE_HOTSPOTS['learn/minnpou/2-87']?.[0];
}

export function isMinpo13DiagramImageKey(imageKey: string): boolean {
  const k = imageKey.trim();
  return (k === 'learn/minnpou/2-87' || k === '2-87') && !!getMinpo13Article602Hotspot();
}
