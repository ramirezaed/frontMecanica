import { fetchUsuarioActivos } from "@/actions/authActions"
import { TablaUsuarios } from "@/components/adminComponentes/TablaUsuarios"

export default async function Activos(){
    const usuarios = await fetchUsuarioActivos()
    if (!usuarios){
        return <div>error al cargar usuarios activos</div>
    }
    return (
        <TablaUsuarios params={usuarios}/>
    )
}