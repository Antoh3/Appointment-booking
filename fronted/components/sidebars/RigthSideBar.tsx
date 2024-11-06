"use client";

import styled from 'styled-components';
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { CustomCard } from '../ui/Card';

const RightSidebarContainer = styled.div`
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopProductsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
`;

const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpenseName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

const ExpenseDate = styled.span`
  font-size: 0.7rem;
  color: #666;
`;

const ExpenseAmount = styled.span<{ isPositive: boolean }>`
  font-weight: bold;
  font-size: 0.9rem;
  color: ${({ isPositive }) => (isPositive ? '#009900' : '#FF0000')};
`;

const ViewAllLink = styled.a`
  font-size: 0.9rem;
  color: #0073e6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const RightSidebar = () => {
    return (
        <RightSidebarContainer className='text-black'>
            {/* Top Products Section */}
            <SectionTitle>Top Products</SectionTitle>
            <TopProductsContainer>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
                <CustomCard title="Top Products">
                    <p>ZendQ - $375,441.00</p>
                    <p>DLhunter - $142,665.00</p>
                </CustomCard>
            </TopProductsContainer>

            {/* Expenses Section */}
            <SectionTitle>
                Expenses <ViewAllLink href="#">View All</ViewAllLink>
            </SectionTitle>
            <ScrollArea>
                <ExpensesContainer>
                    <ExpenseItem>
                        <ExpenseDetails>
                            <ExpenseName>Avanada Inc.</ExpenseName>
                            <ExpenseDate>23 Jul, 2023</ExpenseDate>
                        </ExpenseDetails>
                        <ExpenseAmount isPositive={true}>+$1,386.00</ExpenseAmount>
                    </ExpenseItem>
                    <ExpenseItem>
                        <ExpenseDetails>
                            <ExpenseName>Bougue Mc</ExpenseName>
                            <ExpenseDate>21 Jul, 2023</ExpenseDate>
                        </ExpenseDetails>
                        <ExpenseAmount isPositive={true}>+$711.27</ExpenseAmount>
                    </ExpenseItem>
                    <ExpenseItem>
                        <ExpenseDetails>
                            <ExpenseName>Magesty</ExpenseName>
                            <ExpenseDate>16 Jul, 2023</ExpenseDate>
                        </ExpenseDetails>
                        <ExpenseAmount isPositive={false}>-$392.00</ExpenseAmount>
                    </ExpenseItem>
                    <ExpenseItem>
                        <ExpenseDetails>
                            <ExpenseName>Angela Stant</ExpenseName>
                            <ExpenseDate>11 Jul, 2023</ExpenseDate>
                        </ExpenseDetails>
                        <ExpenseAmount isPositive={true}>+$3,713.32</ExpenseAmount>
                    </ExpenseItem>
                    {/* Additional expenses can be added here */}
                </ExpensesContainer>
                <Scrollbar />
            </ScrollArea>
        </RightSidebarContainer>
    );
};

export default RightSidebar;
