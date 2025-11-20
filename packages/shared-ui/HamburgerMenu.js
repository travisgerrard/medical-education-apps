import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuPopover = styled.div`
  position: fixed;
  top: 70px;
  left: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 999;
  padding: 8px 0;
  min-width: 160px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuItem = styled.a`
  display: block;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
  font-family: Helvetica Neue, Arial, sans-serif;
  color: #333;
  text-decoration: none;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MenuDivider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 4px 0;
`;

function HamburgerMenu({ isOpen, onClose }) {
  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <MenuPopover isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <MenuItem onClick={onClose}>
                {item.label}
              </MenuItem>
            </Link>
            {index < menuItems.length - 1 && <MenuDivider />}
          </React.Fragment>
        ))}
      </MenuPopover>
    </>
  );
}

export default HamburgerMenu;
