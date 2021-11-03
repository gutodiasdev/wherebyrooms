import './styles.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';
import toast from 'react-hot-toast';

type RoomProps = {
  meetingId: string,
  startDate: string,
  endDate: Date,
  roomUrl: string,
}

export function Room({
  meetingId,
  startDate,
  endDate,
  roomUrl }: RoomProps) {
  return (
    <div className="room">
      <div className="room-id">
        <span>{meetingId}</span>
      </div>
      <p>{startDate}</p>
      <p>{endDate}</p>
      <div className="room-link">
        <input type="text" value={roomUrl} name="roomLink" id="roomLink" disabled readOnly />
        <CopyToClipboard text={roomUrl} onCopy={() => toast.success('Link copiado')}>
          <button className="copy-button">
            Copiar link <BiCopy />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}