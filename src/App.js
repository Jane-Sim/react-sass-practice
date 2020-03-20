import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import StyledButton from './components/StyledButton';
import Dialog from './components/Dialog';

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const StyledButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

function App() {
  // 다이얼로그를 보여줄 visible 상태값
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log('확인');
    setDialog(false);
  };
  const onCancel = () => {
    console.log('취소');
    setDialog(false);
  };

  return (
    // ThemeProvider를 사용하면, 내부에 렌더링된 styled-components로 만든 컴포넌트에서 palette를 조회하여 사용할 수 있다.
    <ThemeProvider
      theme={{
        palette: {
          blue: '#228be6',
          gray: '#495057',
          pink: '#f06595',
        },
      }}>
      <>
        <AppBlock>
          <StyledButtonGroup>
            <StyledButton size="large">BUTTON</StyledButton>
            <StyledButton color="pink">BUTTON</StyledButton>
            <StyledButton color="gray" size="small" outline>
              BUTTON
            </StyledButton>
          </StyledButtonGroup>
          <StyledButtonGroup>
            <StyledButton size="large" fullWidth>
              BUTTON
            </StyledButton>
            <StyledButton size="large" color="gray" fullWidth>
              BUTTON
            </StyledButton>
            <StyledButton size="large" color="pink" fullWidth onClick={onClick}>
              삭제
            </StyledButton>
          </StyledButtonGroup>
        </AppBlock>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}>
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </>
    </ThemeProvider>
  );
}

export default App;
