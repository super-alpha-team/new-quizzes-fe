/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-unwanted-polyfillio */
/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect } from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';

function TeXDisplay({ content }) {

    useEffect(() => {
        runTypeSetMathJax();
    }, []);

    function runTypeSetMathJax() {
        window.MathJax?.typeset();
    }

    return (
        <div>
            <Head>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=es6" onLoad={runTypeSetMathJax}></script>
                <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" onLoad={runTypeSetMathJax}></script>
            </Head>
            <div className="flex flex-wrap items-center object-contain">
                {parse(String(content))}
            </div>
        </div>
    );
}

export default TeXDisplay;