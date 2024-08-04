/* eslint-disable no-unused-vars */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import SplitType from "split-type"
function gsapAnimation(items,from,to,trigger,split,textRef){
    if(trigger){
        gsap.from(items,{
            ...from,
            duration:1,
            ease:"elastic.out(1,0.3)",
            stagger:0.5,
            scrollTrigger:{
                trigger:items,
                scrub:true,
                repeat:-1,
                start:"top bottom",
                end:"top 80%",
                repeatDelay:0.5,
                toggleActions:"play play play play",
            }
        });
        gsap.to(items,{
            ...to,
            duration:1,
            ease:"elastic.in(1,0.3)",
            stagger:0.5,
            scrollTrigger:{
                trigger:items,
                start:"top 75%",
                end:"top 70%",
                scrub:true,
                repeat:-1,
                repeatDelay:0.5,
                toggleActions:"play none none play"
            }
        })
    }
    if(split){
        let splitText = new SplitType(textRef);
        gsap.from(".char",{
            transform:"rotateX(45deg)",
            opacity:0,
            ease:"elastic.in(1,0.3)",
            duration:.5,
            stagger:0.05
        })
        gsap.to(".char",{
            transform:"rotateX(0deg)",
            opacity:1,
            ease:"elastic.in(1,0.3)",
            duration:.5,
            stagger:0.05
        })
    }
}
export {gsapAnimation}