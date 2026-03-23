import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { SearchIcon, TextAlignCenter } from "lucide-react"
export function Searchcity(){
    return(
        <div className="flex items-center gap-2">
            <InputGroup className="h-12" >
  <InputGroupInput placeholder="Search...." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
<div className="size-12 flex items-center justify-center border-4 rounded-md">
    
<TextAlignCenter className="text-zinc-600" />
</div>
        </div>
    )
}