"use client";
import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "react-query";
import "./globals.css"


const darkTheme = createTheme({
    shape: {borderRadius: "8px"},
    palette: {mode: "dark"},
});
const queryClient = new QueryClient()
export default function RootLayout({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <html lang="en">
                {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
                <head/>
                <body>
                {children}
                </body>
                </html>
            </ThemeProvider>
        </QueryClientProvider>

    )
}
