import { Trash } from '@phosphor-icons/react'
import { format, getHours, getMinutes, getSeconds, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
interface ReminderProps {
  id: string
  description: string
  completed: boolean
  datetime: any
  onComplete: (id: string) => void
  onRemove: (id: string) => void
}

function completeDate(data: string) {
  const dateISO = parseISO(data);



  return format(dateISO, `dd 'de' MMMM 'de' yyyy 'às' H:mm`, {
    locale: ptBR,
  });
}
export function Reminder({
  id,
  description,
  completed,
  onComplete,
  datetime,
  onRemove,
}: ReminderProps) {
  function handleComplete() {
    onComplete(id)
  }

  function handleRemove() {
    onRemove(id)
  }

  return (
    <div className="flex flex-row justify-between items-start bg-gray-500  border border-gray-400 rounded-lg p-[20px] h-16 mb-[12px] relative">
      <label className="inline-flex relative" htmlFor="login">
        <input
          id="login"
          type="checkbox"
          className="before:content[''] peer cursor-pointer appearance-none  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-dark checked:bg-purple-dark checked:before:bg-purple-dark w-[17.45px] h-[17.45px] mt-[2px] border-2 border-blue-light rounded-full peer/check"
          checked={completed}
          onChange={handleComplete}
        />
        <div className="pointer-events-none absolute top-[10px] left-[9px] -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            className="mt-[2px]"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.43059 0.342154L4.09865 4.67409L1.61618 2.19162L0.780273 3.02753L4.09865 6.3459L9.26649 1.17806L8.43059 0.342154Z"
              fill="#F2F2F2"
            />
          </svg>
        </div>
        <span className="px-[12px] text-gray-100 text-[14px] peer-checked/check:text-gray-300 peer-checked/check:line-through">
          {description}
        </span>


      </label>
      <span className="absolute right-6 bottom-0 text-xs opacity-60">{completeDate(datetime)}</span>
      <button
        className="w-[24px] h-[24px] flex items-center justify-center rounded text-gray-100 hover:text-danger hover:bg-gray-400"
        onClick={handleRemove}
      >
        <Trash size={18} />
      </button>
    </div>
  )
}
