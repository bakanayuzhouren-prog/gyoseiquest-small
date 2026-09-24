import type { ImageSourcePropType } from 'react-native';

export const STARTER_ITEM_IDS = ['ordinary_pencil', 'ordinary_eraser', 'ordinary_notebook'] as const;

export const SHOP_ITEM_IDS = [
    'red_pencil',
    'blue_pen',
    'highlighter',
    'sticky_notes',
    'ruler',
    'compass',
    'calculator',
    'six_code',
    'red_sheet',
    'flash_cards',
    'timer',
    'tea',
    'onigiri',
    'coffee',
    'hachimaki',
    'desk_lamp',
    'study_desk',
    'pass_strap',
    'star_notes',
    'silver_pencil',
    'crystal_eraser',
    'rainbow_notebook',
    'gold_fountain_pen',
    'chacha_plush',
    'legend_six_code',
    'platinum_pen',
    'diamond_clip',
    'rainbow_lamp',
    'myth_desk',
    'golden_lop',
] as const;

export const AVATAR_ITEM_IDS = [...STARTER_ITEM_IDS, ...SHOP_ITEM_IDS] as const;

export type AvatarItemId = (typeof AVATAR_ITEM_IDS)[number];

export type AvatarItem = {
    id: AvatarItemId;
    label: string;
    emoji: string;
    slot: 'hand';
    starter: boolean;
    price: number;
};

export const AVATAR_ITEMS: Record<AvatarItemId, AvatarItem> = {
    ordinary_pencil: {
        id: 'ordinary_pencil',
        label: '普通の鉛筆',
        emoji: '✏️',
        slot: 'hand',
        starter: true,
        price: 0,
    },
    ordinary_eraser: {
        id: 'ordinary_eraser',
        label: '普通の消しゴム',
        emoji: '🧽',
        slot: 'hand',
        starter: true,
        price: 0,
    },
    ordinary_notebook: {
        id: 'ordinary_notebook',
        label: '普通のノート',
        emoji: '📓',
        slot: 'hand',
        starter: true,
        price: 0,
    },
    red_pencil: { id: 'red_pencil', label: '赤鉛筆', emoji: '🖍️', slot: 'hand', starter: false, price: 80 },
    blue_pen: { id: 'blue_pen', label: '青ペン', emoji: '🖊️', slot: 'hand', starter: false, price: 120 },
    highlighter: { id: 'highlighter', label: '蛍光ペン', emoji: '🟡', slot: 'hand', starter: false, price: 200 },
    sticky_notes: { id: 'sticky_notes', label: '付箋セット', emoji: '🗒️', slot: 'hand', starter: false, price: 150 },
    ruler: { id: 'ruler', label: '定規', emoji: '📏', slot: 'hand', starter: false, price: 100 },
    compass: { id: 'compass', label: 'コンパス', emoji: '🧭', slot: 'hand', starter: false, price: 180 },
    calculator: { id: 'calculator', label: '電卓', emoji: '🧮', slot: 'hand', starter: false, price: 300 },
    six_code: { id: 'six_code', label: '六法', emoji: '📘', slot: 'hand', starter: false, price: 500 },
    red_sheet: { id: 'red_sheet', label: '赤シート', emoji: '🟥', slot: 'hand', starter: false, price: 400 },
    flash_cards: { id: 'flash_cards', label: '暗記カード', emoji: '🃏', slot: 'hand', starter: false, price: 350 },
    timer: { id: 'timer', label: '学習タイマー', emoji: '⏱️', slot: 'hand', starter: false, price: 600 },
    tea: { id: 'tea', label: 'お茶', emoji: '🍵', slot: 'hand', starter: false, price: 250 },
    onigiri: { id: 'onigiri', label: 'おにぎり', emoji: '🍙', slot: 'hand', starter: false, price: 200 },
    coffee: { id: 'coffee', label: 'コーヒー', emoji: '☕', slot: 'hand', starter: false, price: 220 },
    hachimaki: { id: 'hachimaki', label: '合格はちまき', emoji: '🎀', slot: 'hand', starter: false, price: 2000 },
    desk_lamp: { id: 'desk_lamp', label: 'デスクランプ', emoji: '💡', slot: 'hand', starter: false, price: 1500 },
    study_desk: { id: 'study_desk', label: '学習机', emoji: '🪑', slot: 'hand', starter: false, price: 3000 },
    pass_strap: { id: 'pass_strap', label: '合格ストラップ', emoji: '🎫', slot: 'hand', starter: false, price: 800 },
    star_notes: { id: 'star_notes', label: '星の付箋', emoji: '⭐', slot: 'hand', starter: false, price: 5000 },
    silver_pencil: { id: 'silver_pencil', label: '銀の鉛筆', emoji: '🥈', slot: 'hand', starter: false, price: 8000 },
    crystal_eraser: { id: 'crystal_eraser', label: '水晶の消しゴム', emoji: '💎', slot: 'hand', starter: false, price: 12000 },
    rainbow_notebook: { id: 'rainbow_notebook', label: '虹色ノート', emoji: '🌈', slot: 'hand', starter: false, price: 18000 },
    gold_fountain_pen: { id: 'gold_fountain_pen', label: '金の万年筆', emoji: '🖋️', slot: 'hand', starter: false, price: 25000 },
    chacha_plush: { id: 'chacha_plush', label: 'ロップのぬいぐるみ', emoji: '🧸', slot: 'hand', starter: false, price: 50000 },
    legend_six_code: { id: 'legend_six_code', label: '伝説の六法', emoji: '📖', slot: 'hand', starter: false, price: 80000 },
    platinum_pen: { id: 'platinum_pen', label: 'プラチナ万年筆', emoji: '🤍', slot: 'hand', starter: false, price: 150000 },
    diamond_clip: { id: 'diamond_clip', label: 'ダイヤのクリップ', emoji: '💠', slot: 'hand', starter: false, price: 300000 },
    rainbow_lamp: { id: 'rainbow_lamp', label: '虹のランプ', emoji: '🏮', slot: 'hand', starter: false, price: 450000 },
    myth_desk: { id: 'myth_desk', label: '神話の学習机', emoji: '🏛️', slot: 'hand', starter: false, price: 700000 },
    golden_lop: { id: 'golden_lop', label: '黄金のロップ', emoji: '🏆', slot: 'hand', starter: false, price: 1000000 },
};

export const STARTER_ITEMS: AvatarItem[] = STARTER_ITEM_IDS.map((id) => AVATAR_ITEMS[id]);
export const SHOP_ITEMS: AvatarItem[] = SHOP_ITEM_IDS.map((id) => AVATAR_ITEMS[id]);

export const ITEM_ICON_SOURCES: Partial<Record<AvatarItemId, ImageSourcePropType>> = {
    ordinary_pencil: require('@/assets/images/items/icon-ordinary-pencil.png'),
    ordinary_eraser: require('@/assets/images/items/icon-ordinary-eraser.png'),
    ordinary_notebook: require('@/assets/images/items/icon-ordinary-notebook.png'),
};

export const ITEM_HELD_SOURCES: Partial<Record<AvatarItemId, ImageSourcePropType>> = {
    ordinary_pencil: require('@/assets/images/items/held-ordinary-pencil.png'),
    ordinary_eraser: require('@/assets/images/items/held-ordinary-eraser.png'),
    ordinary_notebook: require('@/assets/images/items/held-ordinary-notebook.png'),
};

export function isAvatarItemId(value: unknown): value is AvatarItemId {
    return typeof value === 'string' && (AVATAR_ITEM_IDS as readonly string[]).includes(value);
}

export function formatItemPrice(price: number): string {
    return `${price.toLocaleString('ja-JP')} pt`;
}
