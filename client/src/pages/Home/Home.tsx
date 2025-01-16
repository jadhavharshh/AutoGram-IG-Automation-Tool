import { Cover } from "@/components/ui/cover";
import Particles from "@/components/ui/particles";
import BGImage from "@/assets/homepage2.png";
const Home = () => {
  return (
    <>
<div className="w-full bg-white dark:bg-black">

  <div className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-24 overflow-hidden">
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
      <p className="my-4 font-normal text-neutral-600 dark:text-neutral-200 mx-auto mt-2 max-w-5xl text-center text-base md:mt-4 md:text-xl">
        Access an ever-growing collection of premium, meticulously crafted templates and component packs. Save time and focus on what matters—building standout websites that captivate your audience.
      </p>
    </div>

    {/* Image Section */}
    <div className="relative w-full mt-16">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/90 to-black z-10"></div>
      
      <div className="relative z-0 w-full max-w-6xl mx-auto px-4">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={BGImage}
            alt="Product showcase"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </div>
  <div className="relative w-full max-w-7xl mx-auto px-4 py-24">

  </div>
  
</div>

    </>
  )
}

export default Home