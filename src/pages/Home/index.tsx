import './styles.scss';

export function Home() {
  return (
    <div className="main">
      <div className="content">
        <label htmlFor="endDate">Data de término</label>
        <form>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            placeholder="Data e hora de término do meet"
          />
          <button type="submit">Criar sala</button>
        </form>
      </div>

      <div className="separator">
        <span>Salas criadas</span>
      </div>
    </div>
  )
}