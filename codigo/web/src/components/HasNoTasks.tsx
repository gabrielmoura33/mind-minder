import Image from 'next/image'
import clipboard from "../assets/clipboard.svg"
export function HasNoTasks() {
  return (
    <div className="p-[64px] flex flex-col items-center border-t-[1px] border-gray-400">
      <Image
        width={32}
        height={32}
        src={clipboard}
        alt="clipboard"
      />
      <p className="text-gray-300 font-bold text-[16px] mt-[16px]">
        Você ainda não tem lembretes cadastrados
      </p>
      <p className="text-gray-300 text-[16px]">
        Crie lembretes e organize seus itens a fazer
      </p>
    </div>
  )
}
