import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

// 버튼들의 색상을 지정하는 스타일.
// ThemeProvider 로 미리 지정한 테마와 props를 받아와 색상을 지정할 수 있다.
const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      /* outline props가 있으면 해당 css는 다르게 지정해준다. */
      ${props =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

// 버튼의 크기와 폰트 사이즈를 정하는 객체
const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem',
  },
};

// props의 size값에 따라 객체를 지정해준다.
const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

//버튼의 가로를 꽉차게 만드는 스타일
const fullWidthStyle = css`
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

const Button = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  ${fullWidthStyle}

`;

function StyledButton({ children, color, size, outline, fullWidth, ...rest }) {
  return (
    <Button
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      {...rest}>
      {children}
    </Button>
  );
}

StyledButton.defaultProps = {
  color: 'blue',
  size: 'medium',
};

export default StyledButton;
