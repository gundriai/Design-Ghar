const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (email: string, password: string) => {
    return await fetch(`${BASE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
};