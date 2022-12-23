import {useEffect, useState} from "react";
import create from "zustand"
import {persist} from "zustand/middleware"

export const useWordStore = create(
    persist(
        (set, get) => ({
            words: [],
            addWord: (newWord) => set({words: [...get().words, newWord]}),
            removeWord: (word) => set({words: get().words.filter(w => w !== word)}),
        }),
        {
            name: "words"
        }
    )
)

export function useHasHydrated() {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
};