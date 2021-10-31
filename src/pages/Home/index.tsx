import './styles.scss';
import { FormEvent, useState } from 'react';
import axios from 'axios';

export function Home() {

  const [endDateForm, setEndDateForm] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (endDateForm.trim() === '') {
      return;
    }

    const data = {
      endDate: `${endDateForm}-03:00`,
      fields: ["https://call-meethub.whereby.com/"],
    }

    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      "Content-Type": "application/json",
    }

    axios.post("https://api.whereby.dev/v1/meetings", data, { headers })
      .then(response => {
        console.log(response.data);
      });
  }

  return (
    <div className="main">
      <div className="content">
        <label htmlFor="endDate">Data de término</label>
        <form onSubmit={handleCreateRoom}>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            placeholder="Data e hora de término do meet"
            onChange={event => setEndDateForm(event.target.value)}
            value={endDateForm}
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