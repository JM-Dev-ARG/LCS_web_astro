import { useEffect } from 'preact/hooks';
import "./hero.css";

const Hero = () => {
    useEffect(() => {
        const handleScroll = () => {
            const hero = document.getElementById('hero');
            const scrollY = window.scrollY;

            if (scrollY > 2000) {
                hero.classList.add('opacity-0');
            } else {
                hero.classList.remove('opacity-0');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (


        <section
            id="hero"
            className="sticky  top-0 -z-10 h-[100vh] flex flex-col-reverse lg:grid lg:grid-cols-[auto,1fr] w-full overflow-hidden hero bg-[#ffefe9]"
        >

            <div className="h-1/2 lg:h-full w-full flex items-end relative img">
                <img
                    className="h-[300px] w-full lg:h-1/2 lg:w-auto fotoHero object-contain object-center"
                    src="/img/e-saludando.avif"
                    alt=""
                />
            </div>
            <div className="h-full w-full px-10 lg:pr-4 flex items-center relative">
                <picture className="w-full">
                    <source
                        srcset="/resources/Logotipo-animado.svg"
                        type="image/svg+xml"
                        media="(min-width: 600px)"
                    />
                    <img
                        className="w-full h-auto"
                        src="./resources/isotipo-animado.svg"
                        alt=""
                    />
                </picture>
            </div>

        </section>





    );
};

export default Hero;