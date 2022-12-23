"use client";
import {Chip, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import {encodeUrlQueryParams} from "../../utils.js";

export default function WordSuggestions({searchQuery, setSearchQuery}) {
    const {
        data: suggestions,
        isLoading
    } = useQuery(["suggestedWords", searchQuery], () => fetchSuggestedWords(searchQuery))
    if (!searchQuery)
        return <></>
    else if (isLoading)
        return <CircularProgress/>
    else
        return <>
            {
                suggestions.map((suggestion) => <Chip key={suggestion.word} label={suggestion.word}
                                                      onClick={() => setSearchQuery(suggestion.word)}/>)
            }
        </>
}

async function fetchSuggestedWords(query) {
    const queryParams = {s: query};
    const response = await fetch(`https://api.datamuse.com/sug/?${encodeUrlQueryParams(queryParams)}`)
    return await response.json();
}