import { create } from 'zustand';

interface TabState {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const useTabs = create<TabState>((set) => ({
    activeTab: 'home',
    setActiveTab: (tab: string) => set({ activeTab: tab }),
}));

export default useTabs; 