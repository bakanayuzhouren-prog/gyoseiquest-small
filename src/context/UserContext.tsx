import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

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
};

const UserContext = createContext<UserContextType>({
    avatarId: DEFAULT_AVATAR_ID,
    setAvatarId: () => { },
    username: 'Guest',
    setUsername: () => { },
    currentLocation: '東京都新宿区',
    setCurrentLocation: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [avatarId, setAvatarIdState] = useState<AvatarType>(DEFAULT_AVATAR_ID);
    const [username, setUsernameState] = useState('Guest');
    const [currentLocation, setCurrentLocationState] = useState('東京都新宿区');

    // Load saved data on mount
    useEffect(() => {
        if (Platform.OS === 'web') {
            const savedAvatar = localStorage.getItem('gq_avatar');
            const resolved = resolveAvatarId(savedAvatar);
            setAvatarIdState(resolved);
            if (savedAvatar !== resolved) {
                localStorage.setItem('gq_avatar', resolved);
            }
            const savedName = localStorage.getItem('gq_username');
            if (savedName) {
                setUsernameState(savedName);
            }
            const savedLoc = localStorage.getItem('gq_location');
            if (savedLoc) {
                setCurrentLocationState(savedLoc);
            }
        }
    }, []);

    const setAvatarId = (id: AvatarType) => {
        const resolved = resolveAvatarId(id);
        setAvatarIdState(resolved);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_avatar', resolved);
        }
    };

    const setUsername = (name: string) => {
        setUsernameState(name);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_username', name);
        }
    };

    const setCurrentLocation = (loc: string) => {
        setCurrentLocationState(loc);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_location', loc);
        }
    };

    return (
        <UserContext.Provider value={{ avatarId, setAvatarId, username, setUsername, currentLocation, setCurrentLocation }}>
            {children}
        </UserContext.Provider>
    );
};
