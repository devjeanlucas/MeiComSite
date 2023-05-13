import { Link } from "react-router-dom";
import styles from "./NavBarUser.module.css"
import {Swiper,SwiperSlide} from "swiper/react";

export default function NavBarUser () {
    return (
    <>
    
            <Swiper 
            breakpoints={{
                320: {
                  width: 320,
                  slidesPerView: 2,
                },
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
              }}
            className={`${styles.navigation} nav`}
            >
                <SwiperSlide
                >
                    <div
                     className={`nav-item`}
                    >
                        <Link
                        to="/perfil/user/negocio"
                        className="nav-link">Meu Negócio</Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                     className={`nav-item`}
                    >
                        <Link
                        to="/perfil/user/categorias"
                        className="nav-link" aria-current="page">Produtos</Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                     className={`nav-item`}
                    >
                        <Link
                        to="/perfil/user/vendas"
                        className="nav-link" aria-current="page">Vendas</Link>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                     className={`nav-item`}
                    >
                        <Link 
                        to="/perfil/user/membros"
                        className="nav-link">Membros</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div
                     className={`nav-item`}
                    >
                        <Link 
                    to="/perfil/user/config"
                    className="nav-link">Configurações</Link>
                    </div>
                </SwiperSlide>

            </Swiper>
    </>
        )

}