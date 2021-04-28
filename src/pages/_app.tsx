import '../styles/global.scss';
import s from '../styles/app.module.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import { PlayerProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <div className={s.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  )
}

export default MyApp
