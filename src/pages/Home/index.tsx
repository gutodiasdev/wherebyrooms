import './styles.scss';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../../services/firebase';
import { ref, push, child, update, onValue } from 'firebase/database';
import { Room } from '../../components/Room';

type Rooms = {
  meetingId: string,
  startDate: string,
  endDate: string,
  roomUrl: string,
}

export function Home() {
  const [endDateForm, setEndDateForm] = useState('');
  const [startDateForm, setStartDateForm] = useState('');
  const [wherebyRoomsList, setWhereByRoomsList] = useState<Rooms[]>([]);

  useEffect(() => {
    const roomRef = ref(database, `rooms`);

    onValue(roomRef, rooms => {
      const wherebyRooms = rooms.val();

      setWhereByRoomsList(Object.values(wherebyRooms));
    });
  }, []);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (endDateForm.trim() === '') {
      return toast.error('Você precisa escolher data e hora de término do meet!');
    }

    const apiCall = api.post('/', {
      // startDate: startDateForm + ':00-03:00',
      endDate: endDateForm + ':00-03:00',
      fields: ['https://call-meethub.whereby.com']
    })
      .then((response) => {
        const newRoomData = {
          meetingId: response.data.meetingId,
          endDate: response.data.endDate,
          roomUrl: response.data.roomUrl,
        }

        const newRoomKey = push(child(ref(database), 'rooms')).key;
        const updates: any = {};
        updates[`/rooms/${newRoomKey}`] = newRoomData;
        update(ref(database), updates);

      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      })

    toast.promise(apiCall, {
      loading: 'Criando sala...',
      success: 'Sala criada!',
      error: 'Desculpe, houve algo errado.',
    });
  }

  return (
    <div className="main">
      <div className="content">
        <form onSubmit={handleCreateRoom}>
          <div className="form-inputs">
            <div className="form-input-field">
              <label htmlFor="endDate">Data de término</label>
              <input
                type="datetime-local"
                name="endDate"
                id="endDate"
                placeholder="Data e hora de término do meet"
                onChange={event => setEndDateForm(event.target.value)}
                value={endDateForm}
              />
            </div>
          </div>
          <button type="submit">Criar sala</button>
        </form>
      </div>

      <div className="separator">
        <span>Salas criadas</span>
      </div>

      <div className="room-container">
        {
          wherebyRoomsList.map((room) => {
            return (
              <Room
                key={room.meetingId}
                meetingId={room.meetingId}
                endDate={new Date(room.endDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
                roomUrl={room.roomUrl}
              />
            )
          })
        }
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}