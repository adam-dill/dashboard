import React from "react";
import { Portrait, Landscape } from './layouts';
import { Background } from "./components";
import useWindowSize from "./hooks/useWindowSize";

const isDev = process.env.REACT_APP_ENV === "dev";

function App() {
    const size = useWindowSize();

    return (
        <>
            {isDev && (
                <div className="debug-info">
                    {size.width}px / {size.height}px
                </div>
            )}
            
            <Background delay={60000} />
            {size.width > size.height
                ? <Landscape />
                : <Portrait />
            }
        </>
    );
}

export default App;
