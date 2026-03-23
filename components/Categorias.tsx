import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Landmark, Sparkle, Volleyball } from "lucide-react"
export function Categorias(){
    return(
        <div className="flex mt-4 gap-4">
         

          <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Categoria" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="light"><Sparkle /> Top 12 praias</SelectItem>
      <SelectItem value="dark"><Volleyball /> Aventura</SelectItem>
      <SelectItem value="system"><Landmark />Cultura</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
        </div>
    )
}