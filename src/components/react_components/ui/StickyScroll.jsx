import "./stickyScroll.css";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export const StickyScroll = ({
    content,
    contentClassName
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });



    return (
        (<motion.div

            className="h-[420px] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scroll__bar__hide"
            ref={ref}>
            <div className=" relative flex items-start px-4">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-[140px] first:mt-[100px]">
                            {/* {<motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-2xl font-bold text-slate-100">
                                {item.title}
                            </motion.h2>} */}
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg text-slate-300 max-w-sm mt-5">
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    {/* <div className="h-[0px] " /> */}
                </div>
            </div>
            <div

                className={cn(
                    "hidden  md:block h-full w-[400px] sticky top-0 overflow-hidden",
                    contentClassName
                )}>
                {content[activeCard].content ?? null}

            </div>

        </motion.div>)
    );
};
