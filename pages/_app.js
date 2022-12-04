import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { SpotlightProvider } from '@mantine/spotlight';

import Nav from '../components/Nav';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconBuildingSkyscraper, IconCamera, IconHome, IconSubmarine, IconUsers } from '@tabler/icons';

export default function App(props) {
    const { Component, pageProps } = props;

    const router = useRouter();

    const [borderColor, setBorderColor] = useState('white');
    const colorTable = {
        '/': 'white',
        '/about': 'blue',
    };

    const actions = [
        {
            title: 'Home',
            description: 'Get to home page',
            onTrigger: () => console.log('Home'),
            icon: <IconHome size={18} />,
        },
        {
            title: 'About',
            description: 'Learn more about us',
            onTrigger: () => router.push('/about'),
            icon: <IconUsers size={18} />,
        },
        {
            title: 'Vehicles',
            description: 'See our past vehicles, and get progress updates on our current one',
            onTrigger: () => router.push('/vehicles'),
            icon: <IconSubmarine size={18} />,
        },
        {
            title: 'Media',
            description: 'Check out our social media, and see what we\'ve been up to',
            onTrigger: () => router.push('/media'),
            icon: <IconCamera size={18} />,
        },
        {
            title: 'Sponsors',
            description: 'Get in touch with our sponsors, and see what they\'re up to',
            onTrigger: () => router.push('/sponsors'),
            icon: <IconBuildingSkyscraper size={18} />,
        }
    ];

    useEffect(() => {
        console.log(borderColor);
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
                <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={actions} nothingFoundMessage="Nothing found..." highlightQuery>
                    <Nav borderColor={borderColor} />
                    <Component {...pageProps} />
                </SpotlightProvider>
            </MantineProvider>
        </>
    );
}
