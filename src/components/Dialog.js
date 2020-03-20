import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import StyledButton from './StyledButton';

// 투명도를 나타내는 keyframes 효과. fadeIn, fadeOut.
const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

// 아래에서 위로 올라오는 효과를 주는 keyframes 효과. slideUP, slideDown.
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  /* 애니메이션 효과를 적용한다.*/
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  /* visible이 false면 불투명해지는 효과를 준다. */
  ${props =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  /* 애니메이션 효과를 적용한다.*/
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  /* visible이 false면 아래로 내려가는 효과를 준다. */
  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

// 다이얼로그의 취소, 확인 버튼의 위치를 조절.
const StyledButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

// 같은 버튼 컴포넌트가 겹칠경우, 왼쪽에 마진을 준다.
// 원하는 컴포넌트의 스타일을 상속받아서 덮어쓰거나, 커스터마이징할 수 있다. 원래 margin-left: 1rem.
const ShortMarginButton = styled(StyledButton)`
  & + & {
    margin-left: 0.5rem;
  }
`;

function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
}) {
  // 현재 다이얼로그의 꺼지는 애니메이션 효과 상태값
  const [animate, setAnimate] = useState(false);
  // 현재 다이얼로그의 visible 상태값을 나타냄. props값의 visible과 비교하여 애니메이션 효과를 넣어줄 예정.
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // visible 값이 true -> false 가 되는 것을 감지
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  // 애니메이션효과와 현재 visible 효과가 false면 다이얼로그를 가린다.
  if (!animate && !localVisible) return null;
  // disappear는 사라지는 애니메이션 상태를 보여야하는지 알려주는 상태값이다.
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <StyledButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
        </StyledButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
};

export default Dialog;
