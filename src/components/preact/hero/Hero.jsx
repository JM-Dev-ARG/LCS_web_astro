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
            className="sticky  top-0 -z-10 h-[100vh] w-full overflow-hidden hero bg-[#ffefe9]"
        >
            <div className={"w-full h-full flex flex-col-reverse justify-center items-center md:items-end md:justify-end  md:bg-[url('/img/hero-mock.avif')] bg-[center_left_-80px] lg:bg-[center_left] bg-cover xl:bg-contain bg-no-repeat  "}>
                {<div className="md:hidden h-1/2 lg:h-full w-full flex items-end relative img">
                    <img
                        className="h-[300px] w-full lg:h-1/2 lg:w-auto fotoHero object-contain object-center"
                        src="/img/e-saludando.avif"
                        alt=""
                    />
                </div>}
                <div className="h-full w-[70%] md:w-1/2 flex items-center  md:pb-32 relative">

                    <picture className="w-full pr-6 lg:mr-10">
                        <source
                            srcset="./resources/Logotipo-animado.svg"
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
            </div>


        </section>





    );
};

export default Hero;