import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { SpotlightProvider } from '@mantine/spotlight';

import Nav from '../components/Nav';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App(props) {
    const { Component, pageProps } = props;

    const router = useRouter();

    const [ borderColor , setBorderColor ] = useState('white');
    const colorTable = {
        '/': 'white',
        '/about': 'blue',
    }

    useEffect(() => {
        console.log(borderColor)
        setBorderColor(colorTable[router.pathname]);
        
    }, [router]);


    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'dark',
                }}
            >
                <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={[]}>
                    <Nav borderColor={borderColor} />
                    <Component {...pageProps} />
                </SpotlightProvider>
            </MantineProvider>
        </>
    );
}
