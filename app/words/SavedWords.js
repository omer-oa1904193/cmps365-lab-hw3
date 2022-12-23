"use client";
import {Chip} from "@mui/material";
import {useHasHydrated, useWordStore} from "../../stores/wordStore.js";

export function SavedWords({setSearchQuery}) {
    const hasHydrated = useHasHydrated();
    const wordStore = useWordStore();

    return <>
        {
            hasHydrated &&
            wordStore.words.map(word =>
                <Chip key={word} label={word} onDelete={() => wordStore.removeWord(word)}
                      onClick={() => setSearchQuery(word)}/>
            )
        }
    </>
}

