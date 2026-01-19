import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  // Placeholder for future global state (toasts, modals etc.)
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark', // Default to dark for "Premium" feel
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
