import { Cover } from "@/components/ui/cover";
import Particles from "@/components/ui/particles";
import BGImage from "@/assets/homepage2.png";
import gradientBg from "@/assets/bg-compress.avif";
import grainTexture from "@/assets/noise.webp";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import BentoGrid from "./components/Bento-Grid";
import { AccordionDemo } from "./components/Accordion";
const Home = () => {
  return (
    <>
      <div className="w-full bg-white dark:bg-black">
        <div className="relative min-h-screen flex flex-col items-center justify-start pt-32  overflow-hidden">
          <Particles
            className="absolute inset-0 z-0"
            quantity={50}
            ease={80}
            refresh
          />

          {/* Text Content */}
          <div className="relative z-20 w-full max-w-7xl px-4">
            <h1 className="tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mx-auto py-6 text-center text-4xl [text-shadow:0px_1px_3px_rgba(27,37,80,0.14)] md:text-4xl lg:text-7xl font-bold">
              Automate Your Instagram, <br />
              <Cover>Elevate Your Brand</Cover>
            </h1>
            <p className="my-4 font-normal text-neutral-600 dark:text-neutral-200 mx-auto mt-2 max-w-5xl text-center text-base md:mt-4 md:text-xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800">
              Autogram transforms outreach with end-to-end automation. From
              scraping high-quality leads to crafting personalized messages and
              sending them out effortlessly, Autogram handles it all, empowering
              you to focus on scaling your impact.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative w-full mt-16">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black z-10"></div>

            <div className="relative z-0 w-full max-w-6xl mx-auto px-4">
              <NeonGradientCard className="items-center justify-center text-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl ">
                  <img
                    src={BGImage}
                    alt="Product showcase"
                    className="w-full h-auto p-0 m-0"
                  />
                </div>
              </NeonGradientCard>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 py-24 gap-4">
          <div className="flex flex-col text-center">
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mx-auto py-2 text-center [text-shadow:0px_1px_3px_rgba(27,37,80,0.14)] md:text-3xl lg:text-5xl bold">
              How Autogram Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Autogram is designed to simplify your Instagram outreach process.
              Here's how it works:
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl mt-8">
            <div className="relative w-full overflow-hidden rounded-2xl px-4 pt-4 md:rounded-3xl md:px-6 md:pt-6 lg:aspect-[1296/670] lg:p-0">
              <video
                className="relative bottom-0 left-1/2 z-10 w-auto -translate-x-1/2 overflow-hidden rounded-t-lg lg:absolute lg:h-[90%]"
                loop
                muted
                autoPlay
                playsInline
                src="https://assets.basehub.com/191e7e6d/ad4eb38cfa78d745acec4f5faf8d73c1/current-best-for-one-mp4.mp4"
              />
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${gradientBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light z-[1] opacity-15"
                style={{
                  backgroundImage: `url(${grainTexture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 py-24 gap-4">
          <div className="flex flex-col text-center p-4 pb-8">
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white mx-auto py-2 text-center [text-shadow:0px_1px_3px_rgba(27,37,80,0.14)] md:text-3xl lg:text-5xl bold">
              Features of AutoGram
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Autogram is designed to simplify your Instagram outreach process.
              Here's how it works:
            </p>
          </div>
          <BentoGrid />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 py-24 gap-4 ">
          <AccordionDemo />
        </div>
      </div>
    </>
  );
};

export default Home;
