import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@fontsource/inter";
import "./app.css";
import { getCookie } from "vinxi/http";
import {
    ColorModeProvider,
    ColorModeScript,
    cookieStorageManagerSSR,
} from "@kobalte/core";
import { isServer } from "solid-js/web";
import { Toaster } from "./components/ui/toast";

function getServerCookies() {
    "use server";
    const colorMode = getCookie("kb-color-mode");
    return colorMode ? `kb-color-mode=${colorMode}` : "";
}

export default function App() {
    const storageManager = cookieStorageManagerSSR(
        isServer ? getServerCookies() : document.cookie
    );

    return (
        <Router
            root={(props) => (
                <>
                    <ColorModeScript storageType={storageManager.type} />
                    <ColorModeProvider storageManager={storageManager}>
                        <Suspense>{props.children}</Suspense>
                        <Toaster />
                    </ColorModeProvider>
                </>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
