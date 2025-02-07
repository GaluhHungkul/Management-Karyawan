import { LucideIcon } from "lucide-react"

const CardInfo = (props : { title : string, value : number, icon : LucideIcon }) => {
  return (
    <div className=" h-28 bg-blue-700 p-4 duration-300  text-blue-200 rounded-xl ">
        <div className=" text-xl font-bold mb-4">{props.title}</div>
        <div className="flex gap-4 items-center">
            <props.icon size={32} />
        <div className=" text-xl font-bold">{props.value}</div>
        </div>
    </div>
  )
}

export default CardInfo