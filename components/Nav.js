import { Button, createStyles, Navbar, Paper, Title, UnstyledButton } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { IconMaximize, IconSquareArrowDown } from '@tabler/icons';
import { useHover, useWindowScroll } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    root: {
        top: 30,
        left: '50%',
        transform: 'translate(-50%, 0)',

        display: 'flex',
        justifyContent: 'center',

        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors.dark[9], 0.65)
                : theme.fn.rgba(theme.colors.gray[0], 0.53),
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadows.md,
        backdropFilter: 'blur(20px)',

        transition: 'width 0.35s ease, height 0.35s ease, padding 0.35s ease',
    },
    expand: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Nav() {
    const { classes } = useStyles();

    const [scroll, scrollTo] = useWindowScroll();
    const { hovered, ref } = useHover();
    const [expanded, setExpanded] = useState(true);

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
    }, []);

    // set expanded to true when howed is true
    useEffect(() => {
        if (hovered) {
            setExpanded(true);
        }else{
            setExpanded(false);
        }
    }, [hovered]);

    return (
        <Navbar
            height={expanded ? 70 : 60}
            fixed={true}
            p={expanded ? 'sm' : 0}
            width={expanded ? { base: '80vmin' } : { base: '60px' }}
            className={classes.root}
        >
            {!expanded && (
                <div className={classes.expand} ref={ref} >
                    <IconMaximize size={36} stroke={3} />
                </div>
            )}
            <Navbar.Section></Navbar.Section>
        </Navbar>
    );
}

export default Nav;
