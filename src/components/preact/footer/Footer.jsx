import { useEffect } from 'preact/hooks';
import './footer.css';
import navega from "../../../data/navega.json";
import aprende from "../../../data/aprende.json";
import redes from "../../../data/redes.json";




const Footer = () => {
    useEffect(() => {
        const footer = document.querySelector('footer');

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 2000) {
                footer.classList.remove('opacity-0');


            } else {
                footer.classList.add('opacity-0');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className="sticky opacity-0 bottom-0 flex justify-end ">
            <div className="absolute w-full h-full bg-[url('/resources/amo-asegurar.svg')] bg-cover bg-center opacity-[0.03] z-[1]">

            </div>

            <div className="img__container ">
                <img
                    src="./resources/LOGOTIPO-CREMA.svg" alt="" />
            </div>
            <div className="flex flex-col-reverse md:flex-row-reverse justify-around items-center gap-6 md:gap-0 h-1/2 w-full relative z-20">
                <div className="flex flex-col justify-center items-center h-1/2 gap-4">
                    <div className="flex justify-center items-center gap-4">
                        {
                            redes.map((item) => (
                                <div className="border-2 border-zinc-50 size-[40px] rounded-full flex justify-center items-center hover:scale-[1.1] transition-all duration-200 ease-linear group">
                                    <a href={item.href} target={item.target} >
                                        <img src={item.img} alt={item.label} className="size-[40px] p-2 group-hover:scale-[1.1] transition-all duration-200 ease-linear" style="filter: invert(100%) " />
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col gap-2 text-xs text-gray-50 text-center">
                        <p>Copyright © 2024 La Chica del Seguro </p>
                        <p>Reservados todos los derechos</p>
                    </div>


                </div>

                {<div className="flex   justify-center items-start  w-auto gap-10 lg:gap-20  ">
                    <div className="w-auto">
                        <p className="text-[clamp(18px,3vw,22px)] font-medium pl-1 pb-[6px] text-zinc-200">
                            Navega
                        </p>
                        <div className="border-b  border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                        <ul className="flex flex-col gap-[2px]">
                            {aprende.map((item) => (
                                <li key={item.href} className="group text-[clamp(12px,3vw,18px)] leading-tight w-fit">
                                    <a
                                        id="navItem"
                                        className="text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                        href={item.href}
                                        target={item.target}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-auto">
                        <p className="text-[clamp(18px,3vw,22px)] font-medium pl-1 pb-[6px] text-zinc-200">
                            Aprende
                        </p>
                        <div className="border-b border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                        <ul className="flex flex-col gap-[2px]">
                            {navega.map((item) => (
                                <li key={item.href} className="group text-[clamp(12px,3vw,18px)] leading-tight w-fit">
                                    <a
                                        id="navItem"
                                        className="text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                        href={item.href}
                                        target={item.target}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>}

            </div>

            <p class="text-center text-xs font-thin text-gray-300">
                Desarrollado por <a
                    aria-label="Link al Github de JM-Dev"
                    href="https://github.com/JM-Dev-ARG"
                    target="_blank"
                >JM-DEV</a> / Agencia Panambi
            </p>

        </footer>
    );
};

export default Footer;