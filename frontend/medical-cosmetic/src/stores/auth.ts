import { decodeToken, isExpired } from "react-jwt";
import { create } from "zustand";
import { TokenPayload } from "../types/auth";

interface AuthState {
    token: string | null;
    user: TokenPayload | null;
    setAuth: (token: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    getFullName: () => string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem('auth-token'),
    user: JSON.parse(localStorage.getItem('auth-user') || 'null'),

    setAuth: (token: string) => {
        try {
            const decoded = decodeToken(token) as TokenPayload | null;
            
            if (!decoded || isExpired(token)) {
                get().logout();
                return;
            }

            localStorage.setItem('auth-token', token);
            localStorage.setItem('auth-user', JSON.stringify(decoded));
            
            set({ token, user: decoded });
        } catch (error) {
            console.error('Auth error:', error);
            get().logout();
        }
    },

    logout: () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        set({ token: null, user: null });
    },

    isAuthenticated: () => {
        const token = get().token;
        return token ? !isExpired(token) : false;
    },

    getFullName: () => {
        const user = get().user;
        if (!user) return '';
        return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
}));