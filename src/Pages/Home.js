import BoxModalidade from "../layouts/layoutsHome/BoxModalidades";
import BoxPix from "../layouts/layoutsHome/BoxPix";
import BoxServiços from "../layouts/layoutsHome/boxServiços";
import Negocios from "../layouts/layoutsHome/negocios";

export default function Home () {
return (
    <div>
        <Negocios/>
        <BoxServiços/>
        <BoxPix/>
        <BoxModalidade/>
    </div>    
    )
}