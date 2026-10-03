import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { isAvatarAuraId, type AvatarAuraId } from '@/src/data/avatarAuras';
import { isAvatarBackgroundId, type AvatarBackgroundId } from '@/src/data/avatarBackgrounds';
import { STARTER_ITEM_IDS, isAvatarItemId, type AvatarItemId } from '@/src/data/avatarItems';

// --- Avatar Definitions ---
export const AVATARS = {
    male: require('@/assets/images/avatar_student_male.png'),
    female: require('@/assets/images/avatar_student_female.png'),
};

export type AvatarType = keyof typeof AVATARS;

export const DEFAULT_AVATAR_ID: AvatarType = 'male';

export const AVATAR_LABELS: Record<AvatarType, string> = {
    male: '男性',
    female: '女性',
};

const LEGACY_AVATAR_IDS = new Set(['default', 'suit', 'cyber', 'casual']);
const USER_PROFILES_KEY = 'gq_user_profiles';

function readAvatarByUser(): Record<string, AvatarType> {
    if (Platform.OS !== 'web') return {};
    try {
        const raw = localStorage.getItem(USER_PROFILES_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const out: Record<string, AvatarType> = {};
        for (const [name, value] of Object.entries(parsed)) {
            const trimmed = name.trim();
            if (trimmed) out[trimmed] = resolveAvatarId(value);
        }
        return out;
    } catch {
        return {};
    }
}

function writeAvatarByUser(profiles: Record<string, AvatarType>) {
    if (Platform.OS !== 'web') return;
    localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
}

/** 旧保存値・不明値を male へ安全に寄せる */
export function resolveAvatarId(id: unknown): AvatarType {
    if (id === 'male' || id === 'female') return id;
    if (typeof id === 'string' && LEGACY_AVATAR_IDS.has(id)) return DEFAULT_AVATAR_ID;
    return DEFAULT_AVATAR_ID;
}

export function getAvatarSource(id: unknown) {
    return AVATARS[resolveAvatarId(id)];
}

type UserContextType = {
    avatarId: AvatarType;
    setAvatarId: (id: AvatarType) => void;
    username: string;
    setUsername: (name: string) => void;
    currentLocation: string;
    setCurrentLocation: (loc: string) => void;
    heldItemId: AvatarItemId | null;
    setHeldItemId: (id: AvatarItemId | null) => void;
    ownedItemIds: AvatarItemId[];
    addOwnedItemId: (id: AvatarItemId) => void;
    ownsItem: (id: AvatarItemId) => boolean;
    auraId: AvatarAuraId | null;
    setAuraId: (id: AvatarAuraId | null) => void;
    ownedAuraIds: AvatarAuraId[];
    addOwnedAuraId: (id: AvatarAuraId) => void;
    ownsAura: (id: AvatarAuraId) => boolean;
    avatarBackgroundId: AvatarBackgroundId;
    setAvatarBackgroundId: (id: AvatarBackgroundId) => void;
};

const UserContext = createContext<UserContextType>({
    avatarId: DEFAULT_AVATAR_ID,
    setAvatarId: () => { },
    username: 'Guest',
    setUsername: () => { },
    currentLocation: '東京都新宿区',
    setCurrentLocation: () => { },
    heldItemId: null,
    setHeldItemId: () => { },
    ownedItemIds: [...STARTER_ITEM_IDS],
    addOwnedItemId: () => { },
    ownsItem: () => false,
    auraId: null,
    setAuraId: () => { },
    ownedAuraIds: [],
    addOwnedAuraId: () => { },
    ownsAura: () => false,
    avatarBackgroundId: 'none',
    setAvatarBackgroundId: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [avatarId, setAvatarIdState] = useState<AvatarType>(DEFAULT_AVATAR_ID);
    const [username, setUsernameState] = useState('Guest');
    const [currentLocation, setCurrentLocationState] = useState('東京都新宿区');
    const [heldItemId, setHeldItemIdState] = useState<AvatarItemId | null>(null);
    const [ownedItemIds, setOwnedItemIdsState] = useState<AvatarItemId[]>([...STARTER_ITEM_IDS]);
    const [auraId, setAuraIdState] = useState<AvatarAuraId | null>(null);
    const [ownedAuraIds, setOwnedAuraIdsState] = useState<AvatarAuraId[]>([]);
    const [avatarBackgroundId, setAvatarBackgroundIdState] = useState<AvatarBackgroundId>('none');

    // Load saved data on mount
    useEffect(() => {
        if (Platform.OS === 'web') {
            const savedAvatar = localStorage.getItem('gq_avatar');
            const resolved = resolveAvatarId(savedAvatar);
            const loginName = (localStorage.getItem('gq_user') || localStorage.getItem('gq_username') || '').trim();
            const profiles = readAvatarByUser();
            const avatarForUser = loginName ? (profiles[loginName] ?? resolved) : resolved;
            setAvatarIdState(avatarForUser);
            localStorage.setItem('gq_avatar', avatarForUser);
            if (loginName) {
                profiles[loginName] = avatarForUser;
                writeAvatarByUser(profiles);
                localStorage.setItem('gq_user', loginName);
                localStorage.setItem('gq_username', loginName);
                setUsernameState(loginName);
            }
            const savedLoc = localStorage.getItem('gq_location');
            if (savedLoc) {
                setCurrentLocationState(savedLoc);
            }
            const savedHeld = localStorage.getItem('gq_held_item');
            if (isAvatarItemId(savedHeld)) {
                setHeldItemIdState(savedHeld);
            }
            const savedOwned = localStorage.getItem('gq_owned_items');
            if (savedOwned) {
                try {
                    const parsed = JSON.parse(savedOwned);
                    if (Array.isArray(parsed)) {
                        const owned = parsed.filter(isAvatarItemId);
                        setOwnedItemIdsState([...new Set([...STARTER_ITEM_IDS, ...owned])]);
                    }
                } catch {
                    /* ignore */
                }
            }
            const savedAura = localStorage.getItem('gq_aura');
            if (isAvatarAuraId(savedAura)) {
                setAuraIdState(savedAura);
            }
            const savedOwnedAuras = localStorage.getItem('gq_owned_auras');
            if (savedOwnedAuras) {
                try {
                    const parsed = JSON.parse(savedOwnedAuras);
                    if (Array.isArray(parsed)) {
                        setOwnedAuraIdsState(parsed.filter(isAvatarAuraId));
                    }
                } catch {
                    /* ignore */
                }
            }
            const savedBg = localStorage.getItem('gq_avatar_bg');
            if (isAvatarBackgroundId(savedBg)) {
                setAvatarBackgroundIdState(savedBg);
            }
        }
    }, []);

    const setAvatarId = (id: AvatarType) => {
        const resolved = resolveAvatarId(id);
        setAvatarIdState(resolved);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_avatar', resolved);
            const owner = username.trim();
            if (owner && owner !== 'Guest') {
                const profiles = readAvatarByUser();
                profiles[owner] = resolved;
                writeAvatarByUser(profiles);
            }
        }
    };

    const setUsername = (name: string) => {
        const next = name.trim();
        if (!next) return;
        if (Platform.OS === 'web') {
            const profiles = readAvatarByUser();
            const previous = username.trim();
            if (previous && previous !== 'Guest' && previous !== next) {
                if (profiles[previous] && !profiles[next]) profiles[next] = profiles[previous];
                delete profiles[previous];
            }
            if (!profiles[next]) profiles[next] = avatarId;
            writeAvatarByUser(profiles);
            localStorage.setItem('gq_avatar', profiles[next]);
            localStorage.setItem('gq_username', next);
            localStorage.setItem('gq_user', next);
            setAvatarIdState(profiles[next]);
        }
        setUsernameState(next);
    };

    const setCurrentLocation = (loc: string) => {
        setCurrentLocationState(loc);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_location', loc);
        }
    };

    const setHeldItemId = (id: AvatarItemId | null) => {
        setHeldItemIdState(id);
        if (Platform.OS === 'web') {
            if (id) {
                localStorage.setItem('gq_held_item', id);
            } else {
                localStorage.removeItem('gq_held_item');
            }
        }
    };

    const persistOwnedItems = (ids: AvatarItemId[]) => {
        setOwnedItemIdsState(ids);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_owned_items', JSON.stringify(ids));
        }
    };

    const addOwnedItemId = (id: AvatarItemId) => {
        persistOwnedItems([...new Set([...ownedItemIds, id])]);
    };

    const ownsItem = (id: AvatarItemId) => ownedItemIds.includes(id) || STARTER_ITEM_IDS.includes(id as (typeof STARTER_ITEM_IDS)[number]);

    const setAuraId = (id: AvatarAuraId | null) => {
        setAuraIdState(id);
        if (Platform.OS === 'web') {
            if (id) {
                localStorage.setItem('gq_aura', id);
            } else {
                localStorage.removeItem('gq_aura');
            }
        }
    };

    const persistOwnedAuras = (ids: AvatarAuraId[]) => {
        setOwnedAuraIdsState(ids);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_owned_auras', JSON.stringify(ids));
        }
    };

    const addOwnedAuraId = (id: AvatarAuraId) => {
        persistOwnedAuras([...new Set([...ownedAuraIds, id])]);
    };

    const ownsAura = (id: AvatarAuraId) => ownedAuraIds.includes(id);

    const setAvatarBackgroundId = (id: AvatarBackgroundId) => {
        setAvatarBackgroundIdState(id);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_avatar_bg', id);
        }
    };

    return (
        <UserContext.Provider value={{
            avatarId,
            setAvatarId,
            username,
            setUsername,
            currentLocation,
            setCurrentLocation,
            heldItemId,
            setHeldItemId,
            ownedItemIds,
            addOwnedItemId,
            ownsItem,
            auraId,
            setAuraId,
            ownedAuraIds,
            addOwnedAuraId,
            ownsAura,
            avatarBackgroundId,
            setAvatarBackgroundId,
        }}>
            {children}
        </UserContext.Provider>
    );
};
