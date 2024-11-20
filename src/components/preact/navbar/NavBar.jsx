import { useEffect, useRef, useState } from "preact/hooks";
import "./navbar.css"

import navega from "../../../data/navega.json";
import aprende from "../../../data/aprende.json";



const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarMovilRef = useRef();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const handleScrollToTop = (e) => {
        if (e.target.href === "/#hero" || e.target.textContent === "Inicio") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    /*  menuOpen ? window.scroll("0px", "0px") : window.scroll("auto"); */
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
                    <div className="flex justify-left items-center flex-1 ml-8">
                        <a href="/" >
                            <img
                                className={`w-[50px] logo `}
                                src="/resources/corazon-paragua.svg"
                                alt="Logo La Chica del Seguro"
                            /></a>

                    </div>

                    <div className="text-center lg:flex justify-end items-center lg:static z-10 flex-1 ">
                        <div className="flex justify-end items-center flex-1 mr-8 ">
                            <label className="menu__toggle  ">
                                <input
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

                className={`w-full fixed top-0 h-screen flex justify-start items-start bg-[#1d1e1c] z-50 ${menuOpen ? "translate-y-0 bg-opacity-25 " : "-translate-y-full bg-opacity-0"
                    } transition-all duration-500 backdrop-grayscale-[.7] backdrop-blur-[10px]`}
            >
                <div
                    className={`flex justify-center items-center w-full bg-[#1d1e1c] h-full lg:h-[60%] ${menuOpen ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-500`}

                >
                    <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-start lg:items-start w-full lg:w-[80%] gap-10 lg:gap-20 my-6 lg:my-0">
                        <div className="w-[80%] lg:w-[30%]">
                            <p className="text-[clamp(26px,2vw,32px)] font-medium pl-1 pb-[6px] text-zinc-200">
                                Navega
                            </p>
                            <div className="border-b  border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                            <ul className="flex flex-col gap-[6px]">
                                {navega.map((item) => (
                                    <li key={item.href} className="group text-[clamp(22px,2vw,28px)] leading-8 w-fit">
                                        <a
                                            id="navItem"
                                            className="text-zinc-500 hover:text-zinc-100 duration-300 ease-linear"
                                            href={item.href}
                                            target={item.target}
                                            onClick={handleScrollToTop}

                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-[80%] lg:w-[30%]">
                            <p className="text-[clamp(26px,2vw,32px)] font-medium pl-1 pb-[6px] text-zinc-200">
                                Aprende
                            </p>
                            <div className="border-b border-zinc-200 h-auto mb-3 w-[60%] lg:w-auto"></div>
                            <ul className="flex flex-col gap-[6px]">
                                {aprende.map((item) => (
                                    <li key={item.href} className="group text-[clamp(22px,2vw,28px)] leading-8 w-fit">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
