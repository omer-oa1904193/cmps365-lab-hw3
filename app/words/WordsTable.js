"use client";
import {
    Chip,
    CircularProgress,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import {useQuery} from "react-query";
import {useWordStore} from "../../stores/wordStore.js";
import {encodeUrlQueryParams} from "../../utils.js";

export default function WordsTable({searchQuery}) {
    const {data: words, isLoading} = useQuery(["words", searchQuery], () => fetchWords(searchQuery))
    const wordStore = useWordStore();
    if (isLoading)
        return <CircularProgress/>
    else if (words.length === 0)
        return <Paper color="error" sx={{padding: "1rem"}}>
            <Stack direction="row" spacing={2}>
                <ErrorIcon color="error"/>
                <Typography>No words found</Typography>
            </Stack>
        </Paper>
    return <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow
                        sx={{backgroundColor: "#132F4C"}}>
                        <TableCell>Word</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {words.map((row) => (
                        <TableRow
                            key={row.word}
                            sx={{backgroundColor: (wordStore.words.includes(row.word) ? "#184069" : "#132F4C")}}
                            onClick={() => {
                                if (wordStore.words.includes(row.word))
                                    wordStore.removeWord(row.word)
                                else
                                    wordStore.addWord(row.word)
                            }
                            }
                        >
                            <TableCell component="th" scope="row">{row.word}</TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                            <TableCell align="right">
                                {(row?.tags ?? []).map(tag => <Chip key={tag} label={tag} variant="outlined"/>)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </>
}

async function fetchWords(query) {
    const queryParams = {ml: query};
    const response = await fetch(`https://api.datamuse.com/words/?${encodeUrlQueryParams(queryParams)}`)
    return await response.json();
}