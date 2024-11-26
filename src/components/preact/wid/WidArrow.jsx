import "./wid-arrow.css"
import data from "../../../data/historia.json"
import { useEffect } from "preact/hooks";


const WidArrow = () => {
    useEffect(() => {

        function addAnimation() {
            const historiaItems = document.querySelectorAll(".historia-item");
            let currentIndex = 0;

            function animateItems() {
                historiaItems.forEach((item, index) => {
                    item.classList.remove("historia-item-animation");
                    if (index === currentIndex) {
                        item.classList.add("historia-item-animation");
                    }
                });

                currentIndex = (currentIndex + 1) % historiaItems.length;
            }

            // Configurar el intervalo de animación
            const intervalId = setInterval(animateItems, 3000);

            // Ejecutar la animación inmediatamente
            animateItems();

            // Limpiar el intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
        }

        // Ejecutar la animación al montar el componente
        addAnimation();
    }, []);


    return (
        <>{
            data.map((item, index) => {
                return (
                    <div key={index}
                        class="text-gray-50 text-[clamp(13px,3vw,20px)] inline-flex
              items-center gap-2 mr-3 historia-item opacity-30"
                    >
                        <p>{item.text}</p>{" "}
                        {index !== data.length - 1 && (
                            <span>
                                <img
                                    class="h-[clamp(13px,3vw,20px)] w-auto"
                                    src="/resources/flecha-texto.svg"
                                    alt=""
                                />{" "}
                            </span>
                        )}
                    </div>
                );
            })
        }
        </>
    )
}

export default WidArrow