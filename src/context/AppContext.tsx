import { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

 

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ImpactSummary {
  plasticSavedGrams: number;
  carbonOffsetKg: number;
  waterSavedLiters: number;
  treesSaved: number;
}

interface AppState {
  
  cart: CartItem[];
  
  
  compareList: Product[];
  
  
  toasts: Toast[];
  
  
  recentSearches: string[];
  
  
  bookmarkedArticles: number[];
  
  
  isCartOpen: boolean;
  
  
  isCompareOpen: boolean;
}

 

type AppAction =
  
  | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART'; isOpen?: boolean }
  
  
  | { type: 'ADD_TO_COMPARE'; product: Product }
  | { type: 'REMOVE_FROM_COMPARE'; productId: number }
  | { type: 'CLEAR_COMPARE' }
  | { type: 'TOGGLE_COMPARE'; isOpen?: boolean }
  
  
  | { type: 'ADD_TOAST'; toast: Omit<Toast, 'id'> }
  | { type: 'REMOVE_TOAST'; id: string }
  
  
  | { type: 'ADD_RECENT_SEARCH'; query: string }
  | { type: 'CLEAR_RECENT_SEARCHES' }
  
  
  | { type: 'TOGGLE_BOOKMARK'; articleId: number };

 

const initialState: AppState = {
  cart: [],
  compareList: [],
  toasts: [],
  recentSearches: [],
  bookmarkedArticles: [],
  isCartOpen: false,
  isCompareOpen: false,
};

 

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.product.id);
      const quantityToAdd = action.quantity || 1;
      
      if (existingItem) {
        
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          ),
        };
      }
      
      
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: quantityToAdd }],
      };
    }
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.productId),
      };
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.product.id !== action.productId),
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: action.isOpen !== undefined ? action.isOpen : !state.isCartOpen,
      };
    
    
    case 'ADD_TO_COMPARE': {
      
      if (state.compareList.length >= 4) {
        return state;
      }
      
      
      if (state.compareList.some(p => p.id === action.product.id)) {
        return state;
      }
      
      return {
        ...state,
      return { ...state, compareList: [...state.compareList, action.product] };
    }
    case 'REMOVE_FROM_COMPARE':
      return {
        ...state,
        compareList: state.compareList.filter(p => p.id !== action.productId),
      };
    
    case 'CLEAR_COMPARE':
      return { ...state, compareList: [], isCompareOpen: false };
    
    case 'TOGGLE_COMPARE':
      return {
        ...state,
        isCompareOpen: action.isOpen !== undefined ? action.isOpen : !state.isCompareOpen,
      };
    
    
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { ...action.toast, id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` },
        ],
      };
    
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.id),
      };
    
    
    case 'ADD_RECENT_SEARCH': {
      const query = action.query.trim().toLowerCase();
      if (!query) return state;
      
      
      const filtered = state.recentSearches.filter(s => s !== query);
      return {
        ...state,
        recentSearches: [query, ...filtered].slice(0, 5),
      };
    }
    
    case 'CLEAR_RECENT_SEARCHES':
      return { ...state, recentSearches: [] };
    
    
    case 'TOGGLE_BOOKMARK': {
      const isBookmarked = state.bookmarkedArticles.includes(action.articleId);
      return {
        ...state,
        bookmarkedArticles: isBookmarked
          ? state.bookmarkedArticles.filter(id => id !== action.articleId)
          : [...state.bookmarkedArticles, action.articleId],
      };
    }
    
    default:
      return state;
  }
}

 

interface AppContextType {
  state: AppState;
  
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  
  
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  toggleCompare: (isOpen?: boolean) => void;
  isInCompare: (productId: number) => boolean;
  
  
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  
  
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  
  
  toggleBookmark: (articleId: number) => void;
  isBookmarked: (articleId: number) => boolean;
  
  
  cartItemCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  cartImpact: ImpactSummary;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

 

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  
  const addToCart = useCallback((product: Product, quantity?: number) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity });
  }, []);
  
  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  }, []);
  
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);
  
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);
  
  const toggleCart = useCallback((isOpen?: boolean) => {
    dispatch({ type: 'TOGGLE_CART', isOpen });
  }, []);
  
  
  const addToCompare = useCallback((product: Product) => {
    dispatch({ type: 'ADD_TO_COMPARE', product });
  }, []);
  
  const removeFromCompare = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', productId });
  }, []);
  
  const clearCompare = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPARE' });
  }, []);
  
  const toggleCompare = useCallback((isOpen?: boolean) => {
    dispatch({ type: 'TOGGLE_COMPARE', isOpen });
  }, []);
  
  const isInCompare = useCallback((productId: number) => {
    return state.compareList.some(p => p.id === productId);
  }, [state.compareList]);
  
  
  const showToast = useCallback((message: string, type: ToastType = 'success', duration: number = 3000) => {
    const toast = { message, type, duration };
    dispatch({ type: 'ADD_TOAST', toast });
  }, []);
  
  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, []);
  
  
  const addRecentSearch = useCallback((query: string) => {
    dispatch({ type: 'ADD_RECENT_SEARCH', query });
  }, []);
  
  const clearRecentSearches = useCallback(() => {
    dispatch({ type: 'CLEAR_RECENT_SEARCHES' });
  }, []);
  
  
  const toggleBookmark = useCallback((articleId: number) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', articleId });
  }, []);
  
  const isBookmarked = useCallback((articleId: number) => {
    return state.bookmarkedArticles.includes(articleId);
  }, [state.bookmarkedArticles]);
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartTax = cartSubtotal * 0.20;
  const cartTotal = cartSubtotal + cartTax;
  const cartImpact: ImpactSummary = state.cart.reduce(
    (impact, item) => ({
      plasticSavedGrams: impact.plasticSavedGrams + (item.product.impactMetrics.plasticSavedGrams * item.quantity),
      carbonOffsetKg: impact.carbonOffsetKg + (item.product.impactMetrics.carbonOffsetKg * item.quantity),
      waterSavedLiters: impact.waterSavedLiters + (item.product.impactMetrics.waterSavedLiters * item.quantity),
      treesSaved: impact.treesSaved + (item.product.impactMetrics.treesSaved * item.quantity),
    }),
    { plasticSavedGrams: 0, carbonOffsetKg: 0, waterSavedLiters: 0, treesSaved: 0 }
  );
  
  const value: AppContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    addToCompare,
    removeFromCompare,
    clearCompare,
    toggleCompare,
    isInCompare,
    showToast,
    removeToast,
    addRecentSearch,
    clearRecentSearches,
    toggleBookmark,
    isBookmarked,
    cartItemCount,
    cartSubtotal,
    cartTax,
    cartTotal,
    cartImpact,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
