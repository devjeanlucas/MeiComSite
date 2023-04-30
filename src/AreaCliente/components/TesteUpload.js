import { useState } from "react"
import { ref as storageRef, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import App from "../../Hooks/App"



export default function Teste () {
    
    const [imgUrl, setImgURL] = useState("")
    const [progress, setProgress] = useState(0)
    const db = getStorage(App)


    const handleUpload = (event) => {
        event.preventDefault()
        const file = event.target[0]?.files[0]
        if (!file) return;
        const storgeRef = storageRef(db, `MeiComSite/${file.name}`)
        const uploadTask = uploadBytesResumable(storgeRef, file)
        
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url=> {
                    setImgURL(url)
                })
            }

        )
    }


    return (
            <>
                <form onSubmit={handleUpload}>
                    <input type="file" />
                    <button
                    type="submit"
                    >Enviar</button>
                </form>
                <br/>
                {!imgUrl ? <progress value={progress} max="100"/>:
                <img src={imgUrl} alt="imagem"/>
                }

            </>
        )
}