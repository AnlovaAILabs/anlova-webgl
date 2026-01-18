import { create } from 'zustand';

interface State {
    activeServiceIndex: number;
    setActiveServiceIndex: (index: number) => void;
    // Add more state as needed (e.g., scroll progress, mouse position if global)
}

export const useStore = create<State>((set) => ({
    activeServiceIndex: 0,
    setActiveServiceIndex: (index) => set({ activeServiceIndex: index }),
}));
