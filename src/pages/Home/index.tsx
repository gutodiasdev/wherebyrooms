import './styles.scss';
import { FormEvent, useState } from 'react';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';


export function Home() {

  const [endDateForm, setEndDateForm] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (endDateForm.trim() === '') {
      return toast.error('Você precisa escolher data e hora de término do meet!');
    }

    console.log(`${endDateForm}:00-03:00`);


    api.post('/', {
      endDate: endDateForm + ':00-03:00',
      fields: ['https://call-meethub.whereby.com']
    })
      .then((response) => console.log(response.data))

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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}