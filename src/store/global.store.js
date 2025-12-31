import { create } from 'zustand'


export const useGlobalStore = create((set, get) => ({
    isSheetOpen: false,
    sheetContent: null,
    openSheet: (content) => {
        set({isSheetOpen: true, sheetContent: content})
    },
    closeSheet: () => {
        set({isSheetOpen: false, sheetContent: null})
    },

    //TODO: NavbarMobile
    activeNavMobile: false,
    setActiveMobile: (active) => {
        set({activeNavMobile: active})
    }   
 }))