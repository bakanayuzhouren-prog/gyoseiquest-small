export const AVATAR_AURA_IDS = [
    'soft_glow',
    'study_blue',
    'pass_green',
    'focus_purple',
    'fire_red',
    'star_white',
    'rainbow_aura',
    'golden_aura',
] as const;

export type AvatarAuraId = (typeof AVATAR_AURA_IDS)[number];

export type AvatarAura = {
    id: AvatarAuraId;
    label: string;
    emoji: string;
    price: number;
    glow: string;
    ring: string;
};

export const AVATAR_AURAS: Record<AvatarAuraId, AvatarAura> = {
    soft_glow: {
        id: 'soft_glow',
        label: '薄い光',
        emoji: '✨',
        price: 1000,
        glow: 'rgba(255, 236, 179, 0.55)',
        ring: '#f5d76e',
    },
    study_blue: {
        id: 'study_blue',
        label: '勉強の青',
        emoji: '📘',
        price: 3000,
        glow: 'rgba(96, 165, 250, 0.5)',
        ring: '#3b82f6',
    },
    pass_green: {
        id: 'pass_green',
        label: '合格の緑',
        emoji: '📗',
        price: 5000,
        glow: 'rgba(74, 222, 128, 0.5)',
        ring: '#22c55e',
    },
    focus_purple: {
        id: 'focus_purple',
        label: '集中の紫',
        emoji: '🔮',
        price: 8000,
        glow: 'rgba(192, 132, 252, 0.5)',
        ring: '#a855f7',
    },
    fire_red: {
        id: 'fire_red',
        label: '炎の赤',
        emoji: '🔥',
        price: 12000,
        glow: 'rgba(248, 113, 113, 0.5)',
        ring: '#ef4444',
    },
    star_white: {
        id: 'star_white',
        label: '星の白',
        emoji: '🌟',
        price: 20000,
        glow: 'rgba(248, 250, 252, 0.65)',
        ring: '#e2e8f0',
    },
    rainbow_aura: {
        id: 'rainbow_aura',
        label: '虹のオーラ',
        emoji: '🌈',
        price: 50000,
        glow: 'rgba(251, 146, 60, 0.45)',
        ring: '#f59e0b',
    },
    golden_aura: {
        id: 'golden_aura',
        label: '黄金のオーラ',
        emoji: '☀️',
        price: 200000,
        glow: 'rgba(250, 204, 21, 0.6)',
        ring: '#eab308',
    },
};

export const AVATAR_AURA_LIST = AVATAR_AURA_IDS.map((id) => AVATAR_AURAS[id]);

export function isAvatarAuraId(value: unknown): value is AvatarAuraId {
    return typeof value === 'string' && (AVATAR_AURA_IDS as readonly string[]).includes(value);
}
