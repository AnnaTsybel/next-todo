'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Ball {
    id: number;
    size: number;
    duration: number;
    delay: number;
    x: string;
    y: string;
}

const balls: Ball[] = [
    { id: 1, size: 32, duration: 25, delay: 0, x: '5%', y: '10%' },
    { id: 2, size: 40, duration: 30, delay: -8, x: '75%', y: '5%' },
    { id: 3, size: 28, duration: 28, delay: -12, x: '50%', y: '75%' },
    { id: 4, size: 36, duration: 32, delay: -15, x: '25%', y: '70%' },
    { id: 5, size: 24, duration: 26, delay: -10, x: '70%', y: '60%' },
    { id: 6, size: 44, duration: 35, delay: -18, x: '15%', y: '25%' },
];

export default function LavaLamp() {
    return (
        <>
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90"></div>
                <div className="absolute inset-0">
                    {balls.map(ball => (
                        <motion.div
                            key={ball.id}
                            className="absolute rounded-full "
                            style={{
                                width: `${ball.size * 4}px`,
                                height: `${ball.size * 4}px`,
                                left: ball.x,
                                top: ball.y,
                                background: 'var(--bg-accent)',
                                boxShadow: 'var(--shadow-accent)',
                                opacity: 0.7,
                            }}
                            animate={{
                                y: [0, 100, 200, 150, 50, 100, 0],
                                x: [0, 80, -60, 120, -40, 60, 0],
                                scale: [1, 1.05, 0.95, 1.1, 0.98, 1.02, 1],
                            }}
                            transition={{
                                duration: ball.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: ball.delay,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
