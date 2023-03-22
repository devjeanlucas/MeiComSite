import User from "../../Hooks/User"
import styles from "./Header.module.css"

export default function Header () {
    return (
        <div>
            <div>
                {User.length > 0 && 
                <div className={styles.container_header}>
                    <div className={`row ${styles.content}`}>
                        <div className="col-sm-2">
                            <img src={User && User[0].avatar} className={styles.img}/>
                        </div>
                        <div className="col-sm-6">
                            <h4>{User && User[0].email}</h4>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                }
            </div>
        </div>
        )
}