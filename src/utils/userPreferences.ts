const KEY = "weatherapp:preferences";

export type UserPreferences = {
    name: string;
    city: string;
};

export const getUserPreferences = (): UserPreferences | null => {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as UserPreferences) : null;
    } catch {
        return null;
    }
};

export const setUserPreferences = (prefs: UserPreferences) => {
    localStorage.setItem(KEY, JSON.stringify(prefs));
};

export const clearUserPreferences = () => {
    localStorage.removeItem(KEY);
};