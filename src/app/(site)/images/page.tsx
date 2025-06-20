import Image from "next/image"
import carruselInicio from "../../../../public/carrusel-inicio3.jpg"




export default function Page() {
    return (
        <div><Image src = {carruselInicio} alt="Picture of the author"
        // width={1500}
        // height={1500}
        //blurDataURL="data:..." //provisto atuomáticamente a partir del import estatico
        placeholder="blur" // Blur-up opcional
        sizes="100vh"
      />
    </div>
    )
}