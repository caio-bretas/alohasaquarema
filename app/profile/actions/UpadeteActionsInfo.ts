"use server";
import { revalidatePath } from "next/cache";
import { FormEditSchema } from "../schema/formeditschema";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function UpadeteActionsInfo(data: FormEditSchema){
const session = await auth();
if(!session?.user){
    return{
        data: null,
        error:"Usuário não encontrado"
    
    }
}

try{
    const UpadateInfoUser = await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            name: data.nome,
            email: data.email,
            telefone: data.telefone
        }
    })

    revalidatePath("/profile")
    return{
        data: UpadateInfoUser,
        error: null
    }

}catch(error){
    return{
        data: null,
        error:"Erro ao atualizar informações"
    
    }
}
}