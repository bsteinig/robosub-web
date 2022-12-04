import { Code, createStyles, Group, Navbar, NavLink, Text, TextInput, Title, UnstyledButton } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { IconBrandGmail, IconSearch } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    root: {
        top: 30,
        left: '50%',
        transform: 'translate(-50%, 0)',

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors.dark[9], 0.42)
                : theme.fn.rgba(theme.colors.gray[0], 0.53),
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.md,
        backdropFilter: 'blur(20px)',

        transition: 'width 0.35s ease, height 0.35s ease, padding 0.35s ease, justify-content 0.35s ease',
    },
    expanded: {
        justifyContent: 'space-between',
    },
    expand: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchCode: {
        fontWeight: 700,
        fontSize: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}`,
    },
    search: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.dark[7],0.42) : theme.fn.rgba(theme.colors.gray[0],0.53),
    },
}));

function Nav({ borderColor }) {
    const { classes } = useStyles();

    const [scroll, scrollTo] = useWindowScroll();
    const router = useRouter();

    const [locked, setLocked] = useState(false);
    const [expanded, setExpanded] = useState(true);

    const data = [
        { label: 'About', value: '/about' },
        { label: 'Vehicles', value: '/vehicles' },
        { label: 'Media', value: '/media' },
        { label: 'Sponsors', value: '/sponsors' },
    ];

    // set expanded to false if the user scrolls down, and true if they scroll up
    useEffect(() => {
        let lastScrollTop = 0;
        const listener = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                setExpanded(false);
            } else {
                setExpanded(true);
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };
        window.addEventListener('scroll', listener);
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [locked]);

    const links = data.map((item) => (
        <NavLink key={item.label} label={<Text weight={600} size='md'>{item.label}</Text>} variant="subtle" component="a" href={item.value} />
    ));

    return (
        <Navbar
            height={expanded ? 70 : 60}
            fixed={true}
            p={expanded ? 'sm' : 0}
            width={expanded ? { base: '80vw' } : { base: '60px' }}
            className={classes.root + ' ' + (expanded ? classes.expanded : '')}
            style={{
                borderColor: borderColor + ' !important',
                borderWidth: '2px !important',
                borderStyle: 'solid !important',
            }}
        >
            <UnstyledButton
                className={classes.expand}
                onClick={() => {
                    if (expanded) {
                        console.log(router.pathname)
                        router.pathname === '/' ? scrollTo({ y: 0 }) : router.push('/');
                    } else setExpanded(!expanded);
                }}
            >
                <IconBrandGmail size={36} />
            </UnstyledButton>
            {expanded && (
                <>
                    <Navbar.Section>
                        <Group position="apart" noWrap>
                            {links}
                        </Group>
                    </Navbar.Section>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TextInput
                            placeholder="Search"
                            size="sm"
                            radius="md"
                            variant="filled"
                            className={classes.search}
                            icon={<IconSearch size={12} stroke={1.5} />}
                            rightSectionWidth={70}
                            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                            styles={{ rightSection: { pointerEvents: 'none' } }}
                        />
                    </div>
                </>
            )}
        </Navbar>
    );
}

export default Nav;
