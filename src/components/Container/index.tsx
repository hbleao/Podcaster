import { ReactNode } from 'react';

import s from './styles.module.scss';

type ContainerProps = {
  children?: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={s.container}>
      {children}
    </div>
  )
};
