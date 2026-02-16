import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

// --- Avatar Definitions ---
export const AVATARS = {
    default: require('@/assets/images/avatar_suit.png'),
    suit: require('@/assets/images/avatar_suit.png'),
    cyber: require('@/assets/images/avatar_cyber.png'),
    casual: require('@/assets/images/avatar_casual.png'),
};

export type AvatarType = keyof typeof AVATARS;

type UserContextType = {
    avatarId: AvatarType;
    setAvatarId: (id: AvatarType) => void;
    username: string;
    setUsername: (name: string) => void;
    currentLocation: string;
    setCurrentLocation: (loc: string) => void;
};

const UserContext = createContext<UserContextType>({
    avatarId: 'default',
    setAvatarId: () => { },
    username: 'Guest',
    setUsername: () => { },
    currentLocation: '東京都千代田区',
    setCurrentLocation: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [avatarId, setAvatarIdState] = useState<AvatarType>('default');
    const [username, setUsernameState] = useState('Guest');
    const [currentLocation, setCurrentLocationState] = useState('東京都千代田区');

    // Load saved data on mount
    useEffect(() => {
        if (Platform.OS === 'web') {
            const savedAvatar = localStorage.getItem('gq_avatar') as AvatarType;
            if (savedAvatar && AVATARS[savedAvatar]) {
                setAvatarIdState(savedAvatar);
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
        setAvatarIdState(id);
        if (Platform.OS === 'web') {
            localStorage.setItem('gq_avatar', id);
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
