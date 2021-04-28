import s from './styles.module.scss';

type TitleSectionProps = {
  children?: string;
}

export const TitleSection = ({ children }: TitleSectionProps) => (
  <h2 className={s.container}>
    {children}
  </h2>
);
