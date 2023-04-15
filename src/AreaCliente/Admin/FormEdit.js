import BoxConfirm from "../../components/BoxConfirm";


export default function FormEdit (props) {

    return (
            <>
            <h1>Editando item</h1>
            <p>{props.obj && props.obj.nome}</p>
            </>
        )
}