import { TestimonialsColumn, Testimonial } from "../ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials: Testimonial[] = [
  {
    text: "Impeccable finish and spotless cleanup. The lines are razor‑sharp.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop",
    name: "Sarah L.",
    role: "Kanata • Walls & Ceilings",
  },
  {
    text: "On schedule, professional, and the enamel work is flawless.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
    name: "Ahmed R.",
    role: "Nepean • Trim & Doors",
  },
  {
    text: "Our cabinets look factory new. Excellent communication throughout.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&q=80&auto=format&fit=crop",
    name: "Julia M.",
    role: "Orleans • Cabinet Refinishing",
  },
  {
    text: "They transformed our outdated kitchen into a modern masterpiece. Couldn't be happier!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop",
    name: "Emilia W.",
    role: "Downtown • Kitchen Renovation",
  },
  {
    text: "Our bathroom looks like a spa now. Incredible tile work and attention to detail.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&q=80&auto=format&fit=crop",
    name: "Brandon F.",
    role: "Barrhaven • Bathroom Renovation",
  },
  {
    text: "Great color guidance and a beautiful durable finish.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format&fit=crop",
    name: "Chloe P.",
    role: "Gloucester • Living Room",
  },
  {
    text: "The basement renovation exceeded all expectations. Now it's our favourite room in the house.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format&fit=crop",
    name: "Owen T.",
    role: "Stittsville • Basement Finishing",
  },
  {
    text: "Transparent quote and a truly white‑glove experience.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&auto=format&fit=crop",
    name: "Maya K.",
    role: "Vanier • Bedroom",
  },
  {
    text: "New hardwood floors throughout — perfectly installed and the house feels brand new.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop",
    name: "Ethan G.",
    role: "Orleans • Flooring Installation",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsMarquee = () => {
  return (
    <section id="testimonials" className="my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our clients say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See why Ottawa homeowners trust AB Interior Works for painting & renovation.
          </p>
          <a
            href="https://www.google.com/search?q=AB+Interior+Works+Ottawa+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 btn btn-ghost"
            aria-label="See more reviews on Google"
          >
            See more reviews on Google
          </a>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMarquee;
