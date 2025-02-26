
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
                    alt="linear board demo" />
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
                    alt="linear board demo" />
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
                    alt="linear board demo" />
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
                    alt="linear board demo" />
            </div>
        ),
    },
];
export function WidScrollReveal() {
    return (

        <StickyScroll content={content} />

    );
}
