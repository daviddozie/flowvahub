'use client'

import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

interface Reward {
    id: number;
    icon: string;
    title: string;
    description: string;
    points: number;
    status: 'locked' | 'unlocked' | 'coming-soon';
    category: 'all' | 'unlocked' | 'locked' | 'coming-soon';
}

export const RedeemRewards = () => {
    const filters = ['all', 'unlocked', 'locked', 'coming-soon'] as const;
    type RewardFilter = typeof filters[number];

    const [rewardFilter, setRewardFilter] = useState<RewardFilter>('all');
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const containerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useLayoutEffect(() => {
        const index = filters.indexOf(rewardFilter);
        const tab = tabRefs.current[index];
        const container = containerRef.current;

        if (!tab || !container) return;

        const tabRect = tab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setIndicator({
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
        });
    }, [rewardFilter]);

    const rewards: Reward[] = [
        { id: 1, icon: '💸', title: '$5 Bank Transfer', description: 'The $5 equivalent will be transferred to your bank account.', points: 5000, status: 'locked', category: 'locked' },
        { id: 2, icon: '💸', title: '$5 PayPal International', description: 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', points: 5000, status: 'locked', category: 'locked' },
        { id: 3, icon: '🎁', title: '$5 Virtual Visa Card', description: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', points: 5000, status: 'locked', category: 'locked' },
        { id: 4, icon: '🎁', title: '$5 Apple Gift Card', description: 'Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.', points: 5000, status: 'locked', category: 'locked' },
        { id: 5, icon: '🎁', title: '$5 Google Play Card', description: 'Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.', points: 5000, status: 'locked', category: 'locked' },
        { id: 6, icon: '🎁', title: '$5 Amazon Gift Card', description: 'Get a $5 digital gift card to spend on your favorite tools or platforms.', points: 5000, status: 'locked', category: 'locked' },
        { id: 7, icon: '🎁', title: '$10 Amazon Gift Card', description: 'Get a $10 digital gift card to spend on your favorite tools or platforms.', points: 10000, status: 'locked', category: 'locked' },
        { id: 8, icon: '📚', title: 'Free Udemy Course', description: 'Coming Soon!', points: 0, status: 'coming-soon', category: 'coming-soon' },
    ];

    const filteredRewards = rewardFilter === 'all' ? rewards : rewards.filter(r => r.category === rewardFilter);

    const rewardCounts = {
        all: rewards.length,
        unlocked: rewards.filter(r => r.status === 'unlocked').length,
        locked: rewards.filter(r => r.status === 'locked').length,
        'coming-soon': rewards.filter(r => r.status === 'coming-soon').length
    };

    return (
        <div>
            <div className="border-l-4 border-primary pl-4 mb-8">
                <h1 className="text-2xl font-bold">Redeem Your Points</h1>
            </div>

            <div
                ref={containerRef}
                className="relative flex gap-6 mb-8 border-b-2 border-gray-200 overflow-x-auto"
            >
                <motion.span
                    className="absolute bottom-0 h-1 bg-primary rounded z-10"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                        left: indicator.left,
                        width: indicator.width,
                    }}
                />

                {filters.map((filter, index) => (
                    <button
                        key={filter}
                        ref={el => { tabRefs.current[index] = el }}
                        onClick={() => setRewardFilter(filter)}
                        className={`relative cursor-pointer pb-3 px-1 whitespace-nowrap font-semibold flex items-center gap-2 transition-colors
              ${rewardFilter === filter ? 'text-primary bg-[#f4effb]' : 'text-gray-500'}
            `}
                    >
                        {filter === 'all' && 'All Rewards'}
                        {filter === 'unlocked' && 'Unlocked'}
                        {filter === 'locked' && 'Locked'}
                        {filter === 'coming-soon' && 'Coming Soon'}

                        <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {rewardCounts[filter]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Rewards Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {filteredRewards.map((reward) => (
                    <motion.div
                        key={reward.id}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
                            {reward.icon}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">{reward.title}</h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                            {reward.description}
                        </p>

                        <div className="flex items-center gap-1 text-primary font-bold mb-6">
                            <span className="text-yellow-400">⭐</span>
                            <span>{reward.points} pts</span>
                        </div>

                        <button
                            disabled={reward.status !== 'unlocked'}
                            className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${reward.status === 'unlocked'
                                ? 'bg-primary hover:bg-purple-700 text-white'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {reward.status === 'coming-soon' ? 'Coming Soon' : reward.status === 'unlocked' ? 'Redeem' : 'Locked'}
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
