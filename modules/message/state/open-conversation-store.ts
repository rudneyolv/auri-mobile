import { create } from 'zustand';

interface OpenConversationState {
  currentId: string | null;
  setCurrentId: (id: string | null) => void;
}

export const useOpenConversationStore = create<OpenConversationState>((set) => ({
  currentId: null,
  setCurrentId: (id) => set({ currentId: id }),
}));
