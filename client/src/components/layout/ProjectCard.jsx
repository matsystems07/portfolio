import { motion } from "framer-motion";

export default function ProjectCard({
  id,
  title,
  thumbnail = "/assets/placeholder.png",
  description = "",
  tech = [],
  live,
  repo,
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="rounded-xl overflow-hidden bg-white/3 border border-white/6"
    >
      {/* CLICK IMAGE → LIVE WEBSITE */}
      <a
        href={live}
        target="_blank"
        rel="noreferrer"
        className="block w-full h-48 bg-gray-800"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/assets/placeholder.png")}
        />
      </a>

      <div className="p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-semibold text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm text-gray-300 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-xs bg-white/5 px-2 py-1 rounded-md text-gray-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {/* CASE STUDY BUTTON → GITHUB REPO */}
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium px-3 py-2 rounded-md bg-teal-500 hover:bg-teal-400 text-black transition"
          >
            View Case Study
          </a>

          {/* OPTIONAL BUTTONS */}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-3 py-2 rounded-md border border-white/10 text-gray-200 hover:bg-white/5 transition"
            >
              Live
            </a>
          )}

          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-3 py-2 rounded-md border border-white/10 text-gray-200 hover:bg-white/5 transition"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
