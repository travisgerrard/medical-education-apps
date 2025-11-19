import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff4141;
  cursor: pointer;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 1rem 0;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #ff4141;
  }
`;

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <NavContainer>
            <NavContent>
                <Link href="/" passHref legacyBehavior>
                    <Logo>BP Impact</Logo>
                </Link>
                <MenuIcon onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </MenuIcon>
                <NavMenu isOpen={isOpen}>
                    <NavItem>
                        <Link href="/" passHref legacyBehavior>
                            <StyledLink onClick={() => setIsOpen(false)}>Home</StyledLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/about" passHref legacyBehavior>
                            <StyledLink onClick={() => setIsOpen(false)}>About</StyledLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link href="/privacy" passHref legacyBehavior>
                            <StyledLink onClick={() => setIsOpen(false)}>Privacy Policy</StyledLink>
                        </Link>
                    </NavItem>
                </NavMenu>
            </NavContent>
        </NavContainer>
    );
};

export default Navigation;
