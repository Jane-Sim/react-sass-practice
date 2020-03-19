import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';
// css에 필요한 네이밍으로 스타일을 바로 찾게해주는 classNames 라이브러리의 bind.
import classNames from 'classnames/bind';

// 바인드하고자 하는 스타일 css를 넣어줍니다.
const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={cx('checkbox')}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={cx('icon')}>
          {checked ? (
            <MdCheckBox className={cx('checked')} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
