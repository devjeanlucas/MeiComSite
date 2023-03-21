import BoxCriar from "../layouts/layoutsHome/BoxCriar";
import BoxCriarSiteGuia from "../layouts/layoutsHome/BoxCriarSiteGuia";
import BoxModalidade from "../layouts/layoutsHome/BoxModalidades";
import BoxPix from "../layouts/layoutsHome/BoxPix";
import BoxServiços from "../layouts/layoutsHome/boxServiços";
import BoxSuporte from "../layouts/layoutsHome/BoxSuporte";
import BoxTemplates from "../layouts/layoutsHome/BoxTemplates";
import Negocios from "../layouts/layoutsHome/negocios";
import PrincipaisDuvidas from "../layouts/layoutsHome/PrincipaisDuvidas";

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
        <BoxSuporte/>
        <PrincipaisDuvidas/>
    </div>    
    )
}