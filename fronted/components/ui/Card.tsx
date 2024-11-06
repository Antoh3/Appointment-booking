import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardHeader = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  color: #666;
`;

export const CustomCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader>{title}</CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
