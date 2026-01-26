module.exports = function (name) {
    return `import { create } from 'zustand'

/**
 * ${name} Store
 * Zustand store for state management
 */
export const use${name}Store = create((set, get) => ({
  // State
  items: [],
  loading: false,
  error: null,

  // Actions
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  clearItems: () => set({ items: [] }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Async action example
  fetchItems: async () => {
    set({ loading: true, error: null })
    try {
      // const response = await fetch('/api/items')
      // const data = await response.json()
      // set({ items: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))
`;
};
