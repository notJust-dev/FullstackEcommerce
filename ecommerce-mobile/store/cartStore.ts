import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],

  addProduct: (product: any) =>
    // TODO: if already is cart, increase quantity, else, add a new item
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: []})
}));
