import { useState, useEffect, useRef } from "react";
import "./navbar.css"

import whatsapp from "@/assets/img_generales/whatsapp.avif"
import logoAcademia from "@/assets/img_academia/logo_centro.avif"

import navega from "@/data/navegaAcademia.json";
import aprende from "@/data/aprendeAcademia.json";





const NavbarAcademia = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarMovilRef = useRef();
    const [expandedItem, setExpandedItem] = useState(null);

    const toggleSubmenu = (label) => {
        setExpandedItem((prev) => (prev === label ? null : label));
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        menuOpen === false && setExpandedItem(null);
    };

    const handleScrollToTop = (e) => {
        // Obtenemos el href del enlace clickeado (usando currentTarget para mayor precisión)
        const linkHref = e.currentTarget.getAttribute('href');
        // Verificamos si la página actual es la de inicio
        const isHomePage = window.location.pathname === '/academia';

        // Si el enlace es hacia la página de inicio y ya estamos en ella
        if (linkHref === '/' && isHomePage) {
            e.preventDefault(); // Evita la navegación
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll suave al top
        }
        // Si no está en la página de inicio, el href se ejecutará normalmente
    };




    useEffect(() => {

        const closeMenuOnLinkClick = () => setMenuOpen(false);
        const navbarMovilLinks = navbarMovilRef.current.querySelectorAll("a");

        navbarMovilLinks.forEach((link) =>
            link.addEventListener("click", closeMenuOnLinkClick)
        );

        return () => {
            navbarMovilLinks.forEach((link) =>
                link.removeEventListener("click", closeMenuOnLinkClick)
            );
        };
    }, []);

    return (
        <>
            <nav
                id="navbar"
                className="w-full grid place-items-center fixed z-[51] transition-all duration-500 "
            >
                <div className="flex items-center justify-between lg:justify-center w-full mx-auto lg:px-3 2xl:px-0 py-3 ">
                    <div className="flex justify-left items-center flex-1 ml-8 ">
                        <a onClick={handleScrollToTop} href="/academia" title="boton volver al inicio" >
                            <img
                                className={`w-[70px] scale-150  logo hover:rotate-[15deg] hover:scale-125 transition duration-300 ease-in-out`}
                                src={logoAcademia.src}
                                alt="Logo Academia de Seguros por La Chica del Seguro"
                                height="auto"
                                width="auto"
                                title="Logo Academia de Seguros por La Chica del Seguro"
                            />
                        </a>

                    </div>

                    <div className="text-center lg:flex justify-end items-center lg:static z-10 flex-1  ">
                        <div className="flex justify-end items-center flex-1 mr-8 gap-4 ">
                            <a title="whatsapp" href="https://wa.me/5491170627152?text=Hola, quiero hacerles una consulta de la academia" target="_blank" className="hover:scale-[1.1] transition-all ease-linear duration-300">
                                <img
                                    loading="lazy"
                                    src={whatsapp.src}
                                    alt="logo whatsapp"
                                    className="w-[35px] h-[35px]"
                                    height="auto"
                                    width="auto"
                                    title="logo whatsapp"
                                />
                            </a>
                            <label className="menu__toggle hover:scale-[1.1] transition-all ease-linear duration-300">
                                <input
                                    id="menu-toggle"
                                    type="checkbox"
                                    className="menu__input hidden "
                                    checked={menuOpen}
                                    onChange={toggleMenu}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                id="navbar-movil"
                ref={navbarMovilRef}

                className={`w-full fixed top-0 h-screen flex justify-start items-start bg-academia-negro z-50 ${menuOpen ? "translate-y-0 bg-opacity-25 " : "-translate-y-full bg-opacity-0"
                    } transition-all duration-500 backdrop-grayscale-[.7] backdrop-blur-[10px]`}
            >
                <div
                    className={`flex justify-center items-center w-full bg-academia-negro h-full lg:min-h-[80%] lg:h-auto  ${menuOpen ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-500`}

                >
                    <div className="h-full flex flex-col lg:flex-row  justify-center items-center lg:justify-around lg:items-start w-full lg:w-[80%] gap-10 lg:gap-20 my-6 lg:my-0">
                        <div className="w-[80%] lg:w-[40%] ">
                            <p className="text-[clamp(26px,2vw,32px)] font-medium pl-1 pb-[6px] text-zinc-200">
                                Navega
                            </p>
                            <div className="border-b  border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                            <ul className="flex flex-col gap-[6px] ">
                                {navega.map((item) => (
                                    <li key={item.href} className="group text-[clamp(22px,2vw,28px)] leading-8 w-fit">
                                        <a
                                            id="navItem"
                                            className="text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                            href={item.href}
                                            target={item.target}
                                            onClick={handleScrollToTop}
                                            title={item.label}

                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className=" w-[80%] lg:w-[40%]">
                            <p className="text-[clamp(26px,2vw,32px)] font-medium pl-1 pb-[6px] text-zinc-200">
                                Aprende
                            </p>
                            <div className="border-b border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                            <ul className="flex flex-col gap-[6px]">
                                {aprende.map((item) => {
                                    const tieneCursos = Array.isArray(item.cursos) && item.cursos.length > 0;
                                    const isExpanded = expandedItem === item.label;

                                    return (
                                        <li
                                            key={item.href}
                                            className="group text-[clamp(22px,2vw,28px)] leading-8 w-fit"
                                        >
                                            {tieneCursos ? (
                                                <button
                                                    onMouseEnter={() => toggleSubmenu(item.label)}
                                                    className="flex items-center text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                                    title={item.label}
                                                >
                                                    {item.label}
                                                    <span
                                                        className={`ml-2 transition-transform duration-300 ${isExpanded ? "rotate-90" : "rotate-0"
                                                            }`}
                                                    >
                                                        ▶
                                                    </span>
                                                </button>
                                            ) : (
                                                <a
                                                    id="navItem"
                                                    className="text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                                    href={item.href}
                                                    target={item.target}
                                                    title={item.label}
                                                >
                                                    {item.label}
                                                </a>
                                            )}

                                            {tieneCursos && (
                                                <ul
                                                    className={` overflow-hidden transition-all duration-500 pl-4 mt-2 text-[clamp(18px,1.5vw,22px)] text-zinc-400 space-y-1 text-nowrap ${isExpanded ? "max-h-[500px] lg:max-h-max lg:visible opacity-100" : "max-h-0 lg:max-h-max invisible opacity-0"
                                                        }`}
                                                >
                                                    {item.cursos.map((curso) => (
                                                        <li key={curso.href}>
                                                            <a
                                                                href={curso.href}
                                                                title={curso.label}
                                                                className="hover:text-zinc-100 block"
                                                            >
                                                                {curso.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarAcademia;
