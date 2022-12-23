"use client";
import SearchIcon from "@mui/icons-material/Search";
import {InputAdornment, Stack, TextField} from "@mui/material";
import {usePathname, useRouter} from "next/navigation.js";
import {useEffect, useState} from "react";
import {encodeUrlQueryParams} from "../../utils.js";
import {SavedWords} from "./SavedWords.js";
import WordsTable from "./WordsTable.js";
import WordSuggestions from "./WordSuggestions.js";


export default function WordsPage({searchParams}) {
    const [searchQuery, setSearchQuery] = useState(searchParams.query ?? "")
    const router = useRouter();
    const pathName = usePathname()

    useEffect(() => {
        if (searchParams.query !== searchParams)
            router.replace(`${pathName}?${encodeUrlQueryParams({query: searchQuery})}`)
    }, [searchQuery])
    return <>
        <Stack maxWidth="md" direction="column" spacing={2} alignItems="center" sx={{margin: "auto"}}>
            <Stack direction="row" spacing={1} justifyContent="start"
                   sx={{width: "100%", flexWrap: "wrap", alignItems: "center", rowGap: "1rem"}}>
                <TextField label="Search"
                           type="search"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           InputProps={{
                               startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                           }}>
                </TextField>
                <WordSuggestions searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="start" alignItems="start" sx={{width: "100%"}}>
                <SavedWords setSearchQuery={setSearchQuery}/>
            </Stack>

            {searchQuery &&
                <WordsTable searchQuery={searchQuery}/>
            }
        </Stack>
    </>
}
