import { motion } from "framer-motion";

const LayeredShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle 1 - Top Right */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-primary/20"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Circle 2 - Top Right smaller */}
      <motion.div
        className="absolute top-32 right-32 w-32 h-32 rounded-full bg-primary/5 border border-primary/30"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Square - Bottom Left */}
      <motion.div
        className="absolute bottom-40 left-20 w-48 h-48 border-2 border-accent2/20 rotate-45"
        initial={{ rotate: 45, scale: 0 }}
        animate={{ rotate: 405, scale: 1 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Triangle - Middle Left */}
      <motion.div
        className="absolute top-1/2 left-10 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[100px] border-b-accent3/20"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Circle 3 - Bottom Right */}
      <motion.div
        className="absolute bottom-20 right-40 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-accent2/10"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Small dots scattered */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-accent2/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-5 h-5 rounded-full bg-accent3/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Line elements */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-0.5 h-24 bg-gradient-to-b from-transparent via-accent2/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default LayeredShapes;
