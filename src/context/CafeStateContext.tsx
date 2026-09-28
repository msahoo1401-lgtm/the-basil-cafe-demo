"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  MenuItem,
  Workshop,
  INITIAL_MENU,
  INITIAL_WORKSHOP,
} from "../data/cafeData";

const STORAGE_KEY = "basil_demo_state_v2";

export interface CafeStateContextType {
  menuItems: MenuItem[];
  workshop: Workshop;
  isOwnerMode: boolean;
  setIsOwnerMode: React.Dispatch<React.SetStateAction<boolean>>;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  addDishModalOpen: boolean;
  setAddDishModalOpen: (open: boolean) => void;
  addMenuItem: (newItem: Omit<MenuItem, "id">) => void;
  removeMenuItem: (id: string) => void;
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  toggleItemTag: (id: string, tag: string) => void;
  addCustomTag: (id: string, customTag: string) => void;
  logoutOwnerMode: () => void;
  updateWorkshop: (updates: Partial<Workshop>) => void;
  resetDemoData: () => void;
  bookingModalOpen: boolean;
  bookingPrefillNote: string;
  setBookingModalOpen: (open: boolean, prefillNote?: string) => void;
}

const CafeStateContext = createContext<CafeStateContextType | undefined>(undefined);

export function CafeStateProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [workshop, setWorkshop] = useState<Workshop>(INITIAL_WORKSHOP);
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [addDishModalOpen, setAddDishModalOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpenState] = useState<boolean>(false);
  const [bookingPrefillNote, setBookingPrefillNote] = useState<string>("");
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("basil_demo_state_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.menuItems) && parsed.menuItems.length > 0) {
          // Ensure all items have a tags array
          const hydratedItems: MenuItem[] = parsed.menuItems.map((item: Partial<MenuItem>) => ({
            ...item,
            tags: Array.isArray(item.tags)
              ? item.tags
              : INITIAL_MENU.find((im) => im.id === item.id)?.tags || [],
          })) as MenuItem[];
          setMenuItems(hydratedItems);
        }
        if (parsed.workshop && typeof parsed.workshop === "object") {
          setWorkshop(parsed.workshop);
        }
        if (typeof parsed.isOwnerMode === "boolean") {
          setIsOwnerMode(parsed.isOwnerMode);
        }
      }
    } catch (err) {
      console.error("Failed to restore cafe demo state from localStorage", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist changes to localStorage once initial load is done
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload = {
        menuItems,
        workshop,
        isOwnerMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to persist cafe demo state to localStorage", err);
    }
  }, [menuItems, workshop, isOwnerMode, isHydrated]);

  const addMenuItem = useCallback((newItem: Omit<MenuItem, "id">) => {
    const id = `dish-${Date.now()}`;
    const dish: MenuItem = {
      ...newItem,
      id,
      tags: newItem.tags || [],
    };
    setMenuItems((prev) => [dish, ...prev]);
  }, []);

  const removeMenuItem = useCallback((id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleItemStock = useCallback((id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  }, []);

  const updateItemPrice = useCallback((id: string, newPrice: number) => {
    const validPrice = Math.max(0, Math.round(newPrice));
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: validPrice } : item
      )
    );
  }, []);

  const toggleItemTag = useCallback((id: string, tag: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const currentTags = item.tags || [];
        const exists = currentTags.includes(tag);
        const newTags = exists
          ? currentTags.filter((t) => t !== tag)
          : [...currentTags, tag];

        return {
          ...item,
          tags: newTags,
          isBestseller: tag === "Bestseller" ? !exists : item.isBestseller,
          isVegan: tag === "Vegan" ? !exists : item.isVegan,
        };
      })
    );
  }, []);

  const addCustomTag = useCallback((id: string, customTag: string) => {
    const trimmed = customTag.trim();
    if (!trimmed) return;
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const currentTags = item.tags || [];
        if (currentTags.includes(trimmed)) return item;
        return {
          ...item,
          tags: [...currentTags, trimmed],
        };
      })
    );
  }, []);

  const logoutOwnerMode = useCallback(() => {
    setIsOwnerMode(false);
  }, []);

  const updateWorkshop = useCallback((updates: Partial<Workshop>) => {
    setWorkshop((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetDemoData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("basil_demo_state_v1");
    } catch (err) {
      console.error("Failed to reset localStorage state", err);
    }
    setMenuItems(INITIAL_MENU);
    setWorkshop(INITIAL_WORKSHOP);
    setIsOwnerMode(false);
    setLoginModalOpen(false);
    setAddDishModalOpen(false);
    setBookingModalOpenState(false);
    setBookingPrefillNote("");
  }, []);

  const setBookingModalOpen = useCallback((open: boolean, prefillNote?: string) => {
    setBookingModalOpenState(open);
    if (prefillNote !== undefined) {
      setBookingPrefillNote(prefillNote);
    } else if (!open) {
      setBookingPrefillNote("");
    }
  }, []);

  const value = useMemo(
    () => ({
      menuItems,
      workshop,
      isOwnerMode,
      setIsOwnerMode,
      loginModalOpen,
      setLoginModalOpen,
      addDishModalOpen,
      setAddDishModalOpen,
      addMenuItem,
      removeMenuItem,
      toggleItemStock,
      updateItemPrice,
      toggleItemTag,
      addCustomTag,
      logoutOwnerMode,
      updateWorkshop,
      resetDemoData,
      bookingModalOpen,
      bookingPrefillNote,
      setBookingModalOpen,
    }),
    [
      menuItems,
      workshop,
      isOwnerMode,
      loginModalOpen,
      addDishModalOpen,
      addMenuItem,
      removeMenuItem,
      toggleItemStock,
      updateItemPrice,
      toggleItemTag,
      addCustomTag,
      logoutOwnerMode,
      updateWorkshop,
      resetDemoData,
      bookingModalOpen,
      bookingPrefillNote,
      setBookingModalOpen,
    ]
  );

  return (
    <CafeStateContext.Provider value={value}>
      {children}
    </CafeStateContext.Provider>
  );
}

export function useCafeState() {
  const context = useContext(CafeStateContext);
  if (!context) {
    throw new Error("useCafeState must be used within a CafeStateProvider");
  }
  return context;
}
