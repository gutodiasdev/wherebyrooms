import './styles.scss';

type RoomProps = {
  meetingId: string,
  startDate: string,
  endDate: string,
  roomUrl: string,
}

export function Room({
  meetingId,
  endDate,
  roomUrl }: RoomProps) {
  return (
    <div className="room">
      <div className="room-id">
        <span>{meetingId}</span>
      </div>
      <p>{endDate}</p>
      <div className="room-link">
        <input type="text" value={roomUrl} name="roomLink" id="roomLink" disabled readOnly />
      </div>
    </div>
  )
}
