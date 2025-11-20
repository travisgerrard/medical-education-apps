import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuPanel = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-300px'};
  width: 280px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  padding: 20px;
  transition: left 0.3s ease-in-out;
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const CloseButton = styled.div`
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const MenuItem = styled.div`
  padding: 15px 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  font-family: Helvetica Neue, Arial, sans-serif;
  color: #333;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const MenuDivider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
`;

function HamburgerMenu({ isOpen, onClose }) {
    const menuItems = [
        { label: 'About', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
    ];

    const handleMenuClick = (href) => {
        onClose();
        // Small delay to allow animation to complete
        setTimeout(() => {
            window.location.href = href;
        }, 200);
    };

    return (
        <>
            <MenuOverlay isOpen={isOpen} onClick={onClose} />
            <MenuPanel isOpen={isOpen}>
                <MenuHeader>
                    <MenuTitle>Menu</MenuTitle>
                    <CloseButton onClick={onClose}>
                        <IoClose size={32} color="#333" />
                    </CloseButton>
                </MenuHeader>

                {menuItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                        <MenuItem onClick={() => handleMenuClick(item.href)}>
                            {item.label}
                        </MenuItem>
                        {index < menuItems.length - 1 && <MenuDivider />}
                    </React.Fragment>
                ))}
            </MenuPanel>
        </>
    );
}

export default HamburgerMenu;
