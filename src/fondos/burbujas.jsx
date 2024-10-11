import React from 'react'
import { motion } from 'framer-motion'

const Bubble = ({ size, duration, delay, startPosition }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: size,
      height: size,
      left: `${startPosition}%`,
      opacity: 0.4,
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
    }}
    initial={{ y: '100vh' }}
    animate={{
      y: [null, '-100vh'],
      x: [null, `${Math.random() * 20 - 10}vw`],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: 'linear',
    }}
  />
)

export default function AnimatedBackground() {
  const bubbles = Array.from({ length: 30 }, (_, i) => ({
    size: `${Math.random() * 60 + 40}px`,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    startPosition: Math.random() * 100,
    key: i,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-amber-100 to-amber-200">
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.key}
          size={bubble.size}
          duration={bubble.duration}
          delay={bubble.delay}
          startPosition={bubble.startPosition}
        />
      ))}
    </div>
  )
}