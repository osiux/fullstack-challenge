import React, { useState } from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { HOME, SAVED } from '@client/constants/routes';

const Nav = tw.nav`flex items-center bg-gray-800 p-3 flex-wrap`;

const Brand = styled(Link)`
    ${tw`p-2 mr-4 inline-flex items-center`};
`;

const BrandText = tw.span`text-xl text-white font-bold uppercase tracking-wide`;

const ToggleButton = tw.button`text-white inline-flex p-3 outline-none rounded ml-auto hover:bg-gray-900 lg:hidden hover:text-white`;

const LinksContainer = tw.div`w-full items-start flex flex-col lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto`;

const NavLink = styled(Link)`
    ${tw`w-full px-3 py-2 rounded text-gray-200 items-center justify-center lg:inline-flex lg:w-auto hover:bg-gray-900 hover:text-white`};
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const Navigation = styled.div`
        ${tw`w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        ${isOpen ? tw`block` : tw`hidden`}
    `;

    const _toggleMenu = () => setIsOpen((open) => !open);

    return (
        <Nav>
            <Brand to={HOME}>
                <BrandText>Tour Picker</BrandText>
            </Brand>
            <ToggleButton onClick={_toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </ToggleButton>
            <Navigation>
                <LinksContainer>
                    <NavLink to={SAVED}>Saved Tours</NavLink>
                </LinksContainer>
            </Navigation>
        </Nav>
    );
};

export default NavBar;
