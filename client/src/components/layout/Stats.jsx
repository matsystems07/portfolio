import { motion } from "framer-motion";

const statVariant = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.08 * i, type: "spring", stiffness: 120, damping: 14 },
  }),
};

export default function Stats() {
  const stats = [
    { label: "Projects Completed", value: "12+" },
    { label: "Technologies", value: "6+" },
    { label: "Platforms", value: "3+" },
  ];

  return (
    <section className="py-16 bg-transparent border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={statVariant}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/3 border border-white/6"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-teal-400">
                {s.value}
              </div>
              <div className="mt-3 text-sm md:text-base text-gray-300 text-center">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
