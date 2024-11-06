'use client'
import React from 'react';
import styled from 'styled-components';
import TopBar from './NavBar'; 

const MainContentContainer = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #f9fafb;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px; // Add spacing below TopBar
`;

// Example styled cards for the existing content in MainContent
const Card = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 16px);
`;

const MainContent: React.FC = () => {
  return (
    <MainContentContainer className='text-black'>
      <TopBar /> 

      <CardsContainer>
        <Card className='text-black'>
          <h2>Card Title 1</h2>
          <p>Content for card 1...</p>
        </Card>
        <Card>
          <h2>Card Title 2</h2>
          <p>Content for card 2...</p>
        </Card>
        <Card>
          <h2>Card Title 3</h2>
          <p>Content for card 3...</p>
        </Card>
        {/* Add more cards or other content as needed */}
      </CardsContainer>
    </MainContentContainer>
  );
};

export default MainContent;
