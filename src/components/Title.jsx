import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Title = ({title,overview}) => {
  return (
    <div className="pt-36 px-12 absolute bg-gradient-to-r from-black">
      <h1 className="text-3xl font-bold p-6 text-white">{title}</h1>
      <p className="py-6 text-lg w-1/4 text-white">{overview}</p>
      <div>
        <button className="bg-white-500 text-black p-4 px-10 text-xl bg-opacity-50 rounded-lg m-2">
          <FontAwesomeIcon icon={faPlay} /> Play
        </button>
        <button className="bg-white-500 text-black p-4 px-10 text-xl bg-opacity-50 rounded-lg">
          <FontAwesomeIcon icon={faCircleInfo} /> More info
        </button>
      </div>
    </div>
  )
}

export default Title;