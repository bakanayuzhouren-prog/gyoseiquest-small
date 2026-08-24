export const KISOCHI_ROOMS = [
  {
    id: 'kojinjoho',
    title: '個人情報保護法',
    description: '定義・義務・個情委。○×で切る。',
    match: /個情法|個人情報保護法/,
  },
  {
    id: 'gyoseishoshi',
    title: '行政書士法',
    description: '業務の範囲・登録・監督。○×で切る。',
    match: /行政書士法/,
  },
  {
    id: 'koseki',
    title: '戸籍法',
    description: '編製・届出期間・請求。○×で切る。',
    match: /戸籍法/,
  },
  {
    id: 'juki',
    title: '住民基本台帳法',
    description: '住民票・異動届・閲覧。○×で切る。',
    match: /住民基本台帳法|住基法/,
  },
] as const;

export type KisochiRoomId = (typeof KISOCHI_ROOMS)[number]['id'];

export function getKisochiRoom(id: string | undefined) {
  return KISOCHI_ROOMS.find((room) => room.id === id) ?? null;
}
