import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR
  });

  return (
    <header className={styles.header}>
      <img src="/images/logo.svg" alt="Podcaster"/>
      <p className={styles.text}>O melhor para você ouvir, sempre</p>
      <span className={styles.date}>{currentDate}</span>
    </header>
  )
} 
