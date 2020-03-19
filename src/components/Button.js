import React from 'react';
import classNames from 'classnames';
import './Button.scss';

// props값을 가져온다.
// className에서 outline, fullWidth값이 있을 때만 className에 적용한다.
// classNames 라이브러리를 통해 쉽게 className을 적용한다.
// 만약 css에 해당하지 않는 이벤트리스너 함수 등을 넘겨주고 싶을 때(onClick, onMouseMove 등), rest 함수를 이용해서 쉽게 적용한다.
function Button({ children, size, color, outline, fullWidth, ...rest }) {
  return (
    <button
      className={classNames('Button', size, color, { outline, fullWidth })}
      {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
};

export default Button;
