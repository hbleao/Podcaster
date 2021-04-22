
import s from './styles.module.scss';

export const Player = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <img src="/icons/playing.svg" alt="Tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      <div className={s.emptyContent}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={s.footer}>
        <div className={s.progress}>
          <span>00:00</span>
          <div className={s.slider}>
            <div className={s.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={s.buttons}>
          <button>
            <img src="/icons/shuffle.svg" alt="Embaralhar"/>
          </button>
          <button>
            <img src="/icons/play-previous.svg" alt="Tocar anterior"/>
          </button>
          <button className={s.playButton}>
            <img src="/icons/play.svg" alt="Tocar"/>
          </button>
          <button>
            <img src="/icons/play-next.svg" alt="Tocar próxima"/>
          </button>
          <button>
            <img src="/icons/repeat.svg" alt="Tocar novamente"/>
          </button>
        </div>
      </footer>
    </div>
  )
};