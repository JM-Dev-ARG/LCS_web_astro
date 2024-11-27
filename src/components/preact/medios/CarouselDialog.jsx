import { useState, useRef } from 'preact/hooks';
import "./carrousel.css";

const CarouselDialog = ({ fotos, duration = "slow", direction = "left", pause = "true", className = "", classSlider = "" }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    const dialogRef = useRef(null);

    const openDialog = (content, type) => {


        if (type === "iframe") {
            setDialogContent(
                <iframe
                    className="w-full h-full"
                    src={`${content}&autoplay=0`}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    frameBorder="0"
                ></iframe>
            );
        } else if (type === "spotify") {
            setDialogContent(
                <iframe
                    style={{ borderRadius: "12px" }}
                    src={content}
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    frameBorder="0"
                ></iframe>
            );
        }
        setDialogVisible(true);
        dialogRef.current.showModal();
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setDialogContent(null);
        dialogRef.current.close();
    };

    return (
        <div className={"relative"}>


            <div className="rotate-[-4deg] grid place-items-center mt-6">
                <div
                    className={`contenedor ${className}`}
                    data-paused={pause}
                    data-duration={duration}
                    data-direction={direction}
                    data-animated="true"
                >
                    <div className={`slider ${classSlider}`}>
                        {fotos.map((foto) => (
                            <button
                                key={foto.id}
                                className="w-[200px] h-[150px] md:w-[300px] md:h-[220px] lg:w-[400px] lg:h-[300px] rounded-[20px] overflow-hidden mr-6 hover:scale-[1.02] transition-all duration-300"
                                onClick={() => openDialog(foto.iframe || foto.iframeSpoty, foto.iframe ? "iframe" : "spotify")}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={foto.foto}
                                    alt=""
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {dialogVisible && (
                <dialog
                    ref={dialogRef}
                    className=" rotate-[4deg] absolute  inset-0  z-50 w-full h-[600px] xl:w-[60%]  bg-[#455e54] rounded-[20px] flex flex-col justify-center items-center "
                >
                    <form
                        method="dialog"
                        className="w-full h-auto px-5 pt-5"
                    >
                        <button
                            onClick={closeDialog}
                            className="w-full flex justify-end items-center invert"
                        >
                            <img
                                className="w-8 h-8"
                                src="/svg/menu_close.svg"
                                alt="Cerrar"
                            />
                        </button>
                    </form>
                    <div
                        id="content"
                        className="w-full h-[calc(100%-52px)] flex justify-center items-center object-contain p-[20px] overflow-hidden"
                    >
                        {dialogContent}
                    </div>
                </dialog>
            )}


        </div>
    );
};

export default CarouselDialog;
