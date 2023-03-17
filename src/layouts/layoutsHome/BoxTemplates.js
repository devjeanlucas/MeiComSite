import styles from "./BoxTemplates.module.css"

export default function BoxTemplates () {
return (
    <div className={styles.container}>
        <div className={`${styles.row} row`}>
            <div className="col-2 order-2">
                <h1>Templates</h1>
            </div>
            <div className="col-10">
                <div className="line"></div>
            </div>
        </div>
        
        <div className="row">

            <div className="col-6 col-md-4">
                <div className={styles.box}>

                </div>
            </div>
            <div className="col-6 col-md-4">
                <div className={styles.box}>

                </div>
            </div>
            <div className="col-6 col-md-4">
                <div className={styles.box}>

                </div>
            </div>
            
        </div>

    </div>
    )
}