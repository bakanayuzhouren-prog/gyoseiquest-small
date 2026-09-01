export const AVATAR_BACKGROUND_IDS = ['none', 'cream', 'navy', 'teal', 'paper'] as const;

export type AvatarBackgroundId = (typeof AVATAR_BACKGROUND_IDS)[number];

export type AvatarBackground = {
    id: AvatarBackgroundId;
    label: string;
    color: string;
};

export const AVATAR_BACKGROUNDS: Record<AvatarBackgroundId, AvatarBackground> = {
    none: { id: 'none', label: 'なし', color: '#ffffff' },
    cream: { id: 'cream', label: 'クリーム', color: '#f5efe4' },
    navy: { id: 'navy', label: '紺', color: '#1e3a5f' },
    teal: { id: 'teal', label: 'ティール', color: '#2a6f6a' },
    paper: { id: 'paper', label: '原稿用紙', color: '#fff8e8' },
};

export const AVATAR_BACKGROUND_LIST = AVATAR_BACKGROUND_IDS.map((id) => AVATAR_BACKGROUNDS[id]);

export function isAvatarBackgroundId(value: unknown): value is AvatarBackgroundId {
    return typeof value === 'string' && (AVATAR_BACKGROUND_IDS as readonly string[]).includes(value);
}
