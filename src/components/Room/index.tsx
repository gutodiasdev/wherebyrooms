import './styles.scss';

type RoomProps = {
  meetingId: string,
  startDate: string,
  endDate: string,
  roomUrl: string,
}

export function Room({
  meetingId,
  startDate,
  endDate,
  roomUrl }: RoomProps) {
  return (
    <div className="room">
      <p>{meetingId}</p>
      <p>{startDate}</p>
      <p>{endDate}</p>
      <p>{roomUrl}</p>
    </div>
  )
}