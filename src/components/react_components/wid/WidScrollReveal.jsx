
import { StickyScroll } from "../ui/StickyScroll.jsx";
import textGrid from "../../../data/textGrid.json";

const content = [
    {
        title: "Collaborative Editing",
        description:
            textGrid.text1,
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white ">
                <img
                    src="/img/wid1.avif"

                    className="h-full w-full object-cover rounded-2xl overflow-hidden"
                    alt="foto La Chica del Seguro sentada en un escritorio" />
            </div>
        ),
    },
    {
        title: "Real time changes",
        description:
            textGrid.text2,
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/img/wid2.avif "

                    className="h-full w-full object-cover rounded-2xl overflow-hidden"
                    alt="foto La Chica del Seguro en el Foro Nacional de Seguros" />
            </div>
        ),
    },
    {
        title: "Version control",
        description:
            textGrid.text3,
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/img/wid3.avif"

                    className="h-full w-full object-cover rounded-2xl overflow-hidden"
                    alt="Foto La Chica del Seguro invitada al podcast CNP" />
            </div>
        ),
    },
    {
        title: "Running out of content",
        description:
            textGrid.text4,
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <img
                    src="/img/wid4.avif"
                    className="h-full w-full object-cover rounded-2xl overflow-hidden"
                    alt="Foto La Chica del Seguro invitada al programa televisivo Pool Economico" />
            </div>
        ),
    },
];
export function WidScrollReveal() {
    return (

        <StickyScroll content={content} />

    );
}
