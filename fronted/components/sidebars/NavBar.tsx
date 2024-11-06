'use client'
import React from 'react';
import styled from 'styled-components';
import { MagnifyingGlassIcon, GearIcon, BellIcon } from '@radix-ui/react-icons';

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f1f5f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  width: 250px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  color: #374151;
  margin-left: 8px;
  width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const NavLink = styled.a`
  font-size: 16px;
  color: #374151;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #1f2937;
  }

  &:first-child {
    font-weight: 600;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url('https://via.placeholder.com/32'); // Replace with your image URL
  background-size: cover;
  background-position: center;
`;

const TopBar: React.FC = () => {
  return (
    <TopBarContainer className='text-black'>
      <SearchBar>
        <MagnifyingGlassIcon color="#6b7280" />
        <SearchInput placeholder="Search" />
      </SearchBar>
      
      <NavLinks>
        <NavLink>My Teams</NavLink>
        <NavLink>Transfers</NavLink>
        <NavLink>Schedule</NavLink>
      </NavLinks>
      
      <IconsContainer>
        <GearIcon color="#374151" />
        <BellIcon color="#374151" />
        <ProfileImage />
      </IconsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
