import styles from "./BoxTemplates.module.css"
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';

export default function BoxTemplates () {
return (
    <>
    <div className={styles.container}>
        <div className={`${styles.row} row`}>
            <div className="col-2 order-2">
                <h1>Templates</h1>
            </div>
            <div className="col-7">
                <div className="line"></div>
            </div>
        </div>
    <Swiper
        spaceBetween={10}
        className={styles.cont_slides}
        breakpoints={{
            320: {
              width: 320,
              slidesPerView: 1,
            },
            768: {
                width: 768,
                slidesPerView: 2,
              },
          }}
        >
            <SwiperSlide>
                <div className={styles.box}>
                    <div className={styles.cont_img}>
                        <img src="https://cdn.dribbble.com/userupload/3109677/file/original-e1467f69d893476792827f1b16f0129c.png?compress=1&resize=1024x768"/>
                    </div>
                    <p className={styles.name_template}>Loja Online</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.box}>
                    <div className={styles.cont_img}>
                        <img src="https://cdn.dribbble.com/users/1293874/screenshots/14569847/media/c29d123324701019bf5912795e6973e4.png?compress=1&resize=768x576&vertical=top"/>
                    </div>
                    <p className={styles.name_template}>Agendamento</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.box}>
                    <div className={styles.cont_img}>
                        <img src="https://cdn.dribbble.com/users/1784922/screenshots/15990536/media/0be2d483a54d4498fe295c3fd2abbb53.png?compress=1&resize=768x576&vertical=top"/>
                    </div>
                    <p className={styles.name_template}>Restaurante</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.box}>
                    <div className={styles.cont_img}>
                        <img src="https://cdn.dribbble.com/users/1517787/screenshots/7049792/media/58e7ffccb2677d30a5568124d1429cbe.png?compress=1&resize=768x576&vertical=top"/>
                    </div>
                    <p className={styles.name_template}>Restaurante</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.box}>
                    <div className={styles.cont_img}>
                        <img src="https://cdn.dribbble.com/userupload/4788394/file/original-fcf99b9b2164f1ff7f3f447a17de9c42.png?compress=1&resize=1024x768"/>
                    </div>
                    <p className={styles.name_template}>Loja Virtual</p>
                </div>
            </SwiperSlide>
    </Swiper>
    <h4>Ver todos</h4>
    </div>
    </>
    )
}