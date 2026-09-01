import type { ImageSourcePropType } from 'react-native';

export const STARTER_ITEM_IDS = ['ordinary_pencil', 'ordinary_eraser', 'ordinary_notebook'] as const;

export type AvatarItemId = (typeof STARTER_ITEM_IDS)[number];

export type AvatarItem = {
    id: AvatarItemId;
    label: string;
    emoji: string;
    slot: 'hand';
    starter: true;
};

export const AVATAR_ITEMS: Record<AvatarItemId, AvatarItem> = {
    ordinary_pencil: {
        id: 'ordinary_pencil',
        label: '普通の鉛筆',
        emoji: '✏️',
        slot: 'hand',
        starter: true,
    },
    ordinary_eraser: {
        id: 'ordinary_eraser',
        label: '普通の消しゴム',
        emoji: '🧽',
        slot: 'hand',
        starter: true,
    },
    ordinary_notebook: {
        id: 'ordinary_notebook',
        label: '普通のノート',
        emoji: '📓',
        slot: 'hand',
        starter: true,
    },
};

export const STARTER_ITEMS: AvatarItem[] = STARTER_ITEM_IDS.map((id) => AVATAR_ITEMS[id]);

export const ITEM_ICON_SOURCES: Record<AvatarItemId, ImageSourcePropType> = {
    ordinary_pencil: require('@/assets/images/items/icon-ordinary-pencil.png'),
    ordinary_eraser: require('@/assets/images/items/icon-ordinary-eraser.png'),
    ordinary_notebook: require('@/assets/images/items/icon-ordinary-notebook.png'),
};

export const ITEM_HELD_SOURCES: Record<AvatarItemId, ImageSourcePropType> = {
    ordinary_pencil: require('@/assets/images/items/held-ordinary-pencil.png'),
    ordinary_eraser: require('@/assets/images/items/held-ordinary-eraser.png'),
    ordinary_notebook: require('@/assets/images/items/held-ordinary-notebook.png'),
};

export function isAvatarItemId(value: unknown): value is AvatarItemId {
    return typeof value === 'string' && (STARTER_ITEM_IDS as readonly string[]).includes(value);
}
