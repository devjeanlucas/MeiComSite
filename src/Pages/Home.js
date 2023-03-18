import BoxCriar from "../layouts/layoutsHome/BoxCriar";
import BoxCriarSiteGuia from "../layouts/layoutsHome/BoxCriarSiteGuia";
import BoxModalidade from "../layouts/layoutsHome/BoxModalidades";
import BoxPix from "../layouts/layoutsHome/BoxPix";
import BoxServiços from "../layouts/layoutsHome/boxServiços";
import BoxTemplates from "../layouts/layoutsHome/BoxTemplates";
import Negocios from "../layouts/layoutsHome/negocios";

export default function Home () {
return (
    <div>
        <Negocios/>
        <BoxServiços/>
        <BoxPix/>
        <BoxCriarSiteGuia/>
        <BoxModalidade/>
        <BoxTemplates/>
        <BoxCriar/>
    </div>    
    )
}