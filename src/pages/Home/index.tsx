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
  const [wherebyRoomsList, setWhereByRoomsList] = useState<Rooms[]>([]);

  useEffect(() => {
    const roomRef = ref(database, `rooms`);

    onValue(roomRef, rooms => {
      const wherebyRooms = rooms.val();

      console.log(wherebyRooms);
      setWhereByRoomsList(Object.values(wherebyRooms));
    });
  }, []);

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (endDateForm.trim() === '') {
      return toast.error('Você precisa escolher data e hora de término do meet!');
    }

    console.log(`${endDateForm}:00-03:00`);

    await api.post('/', {
      endDate: endDateForm + ':00-03:00',
      fields: ['https://call-meethub.whereby.com']
    })
      .then((response) => {
        console.log(response.data);

        const newRoomData = {
          meetingId: response.data.meetingId,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          roomUrl: response.data.roomUrl,
        }

        const newRoomKey = push(child(ref(database), 'rooms')).key;
        const updates: any = {};
        updates[`/rooms/${newRoomKey}`] = newRoomData;
        update(ref(database), updates);

      })

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


      {
        wherebyRoomsList.map((room: any) => {
          return (
            <Room
              key={room.meetingId}
              meetingId={room.meetingId}
              startDate={room.startDate}
              endDate={room.endDate}
              roomUrl={room.roomUrl}
            />
          )
        })
      }

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}