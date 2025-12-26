'use client'

import { useState } from 'react';
import { AwardIcon, CalendarIcon, FaceBook, Linkedin, ShareIcon, Start, TogetherIcon, Twitter, Whatsapp } from '../svg';
import { Button } from '../ui/button';
import { User, Gift, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const EarnPoints = () => {
    const [points] = useState(5);
    const [streak] = useState(0);
    const [referrals] = useState(0);
    const [pointsEarned] = useState(0);
    const [copied, setCopied] = useState(false);
    const referralLink = "https://app.flowvahub.com/signup?ref=david6394";

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const today = new Date().getDay();
    const currentDay = today === 0 ? 6 : today - 1;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnSocial = (platform: string) => {
        const text = "Check out Flowva Hub!";
        const url = referralLink;

        const urls: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    const cardMotion = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const buttonMotion = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
    };

    return (
        <div className="mb-8">
            <div className="border-l-4 border-primary pl-4 mb-8">
                <h1 className="text-2xl font-bold">Your Rewards Journey</h1>
            </div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15 }}
            >
                <motion.div
                    variants={cardMotion}
                    className="bg-white rounded-2xl shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6 bg-[#eef2ff] pt-3 pb-3 px-6 rounded-t-2xl">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <AwardIcon />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">Points Balance</h2>
                    </div>
                    <motion.div className='px-6 pb-6'>
                        <div className="flex items-center justify-between mb-8">
                            <div className="text-4xl font-bold text-primary">{points}</div>
                            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Progress to $5 Gift Card</span>
                                <span className="text-sm font-semibold text-gray-700">5/5000</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '0.1%' }} />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            🚀 Just getting started — keep earning points!
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div variants={cardMotion} className="bg-white rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-6 bg-[#eef2ff] px-6 pt-3 pb-3 rounded-t-2xl">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <CalendarIcon />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700">Daily Streak</h2>
                    </div>
                    <div className='px-6 pb-6'>
                        <div className="mb-6">
                            <div className="text-4xl font-bold text-primary mb-2">{streak} day</div>
                        </div>
                        <div className="flex justify-between mb-6">
                            {days.map((day, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`w-10 h-10 rounded-full text-sm flex items-center justify-center font-semibold ${idx === currentDay
                                        ? 'border-2 border-primary text-gray-700 bg-gray-200'
                                        : 'bg-gray-200 text-gray-400'
                                        }`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    {day}
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-center text-gray-600 mb-6">
                            Check in daily to earn +5 points
                        </p>
                        <motion.div {...buttonMotion}>
                            <Button className="w-full h-12 bg-primary hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                                </svg>
                                Claim Today's Points
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div variants={cardMotion} className="bg-linear-to-br from-purple-600 via-purple-500 to-blue-400 rounded-2xl shadow-lg text-white relative overflow-hidden">
                    <div className='px-6 pt-6'>
                        <div className="absolute top-6 right-6 text-3xl">🪄</div>
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
                            Featured
                        </div>
                        <h2 className="text-xl font-bold mb-2">Top Tool Spotlight</h2>
                        <h3 className="text-2xl font-bold mb-4">Reclaim</h3>
                    </div>
                    <div className="flex items-start gap-3 bg-white p-6">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="4" y="5" width="16" height="14" rx="2" stroke="#9012fe" strokeWidth="1.5" fill="none" />
                                <line x1="4" y1="10" x2="20" y2="10" stroke="#9012fe" strokeWidth="1.5" />
                                <rect x="7" y="2" width="2" height="5" fill="#9012fe" />
                                <rect x="15" y="2" width="2" height="5" fill="#9012fe" />
                            </svg>
                        </div>
                        <div className='text-black'>
                            <h4 className="font-bold mb-1 text-base">Automate and Optimize Your Schedule</h4>
                            <p className="text-sm leading-relaxed">
                                Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white px-6 pb-6">
                        <motion.div {...buttonMotion} className="flex-1">
                            <Button className="flex-1 h-12 bg-linear-to-r from-purple-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors text-sm">
                                <User />
                                Sign up
                            </Button>
                        </motion.div>
                        <motion.div {...buttonMotion} className="flex-1">
                            <Button className="flex-1 h-12 bg-linear-to-r from-red-500 to-purple-500 hover:from-purple-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors text-sm">
                                <Gift />
                                Claim 50 pts
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="mb-12"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15 }}
            >
                <div className="border-l-4 border-primary pl-4 mb-6">
                    <h2 className="text-2xl font-bold">Earn More Points</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={cardMotion} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                                <Start />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Refer and win 10,000 points!</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-purple-600 font-semibold">10,000 points</span>. Friends must complete onboarding to qualify.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={cardMotion} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                                <ShareIcon />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">Share Your Stack</h3>
                                <p className="text-gray-500 text-sm">Earn +25 pts</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pl-1">
                            <p className="text-gray-700 text-sm">Share your tool stack</p>
                            <motion.button
                                {...buttonMotion}
                                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors text-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Refer & Earn Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15 }}
            >
                <div className="border-l-4 border-primary pl-4 mb-6">
                    <h2 className="text-2xl font-bold">Refer & Earn</h2>
                </div>

                <motion.div variants={cardMotion} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                            <TogetherIcon />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Link</h3>
                            <p className="text-gray-600">Invite friends and earn 25 points when they join!</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <motion.div variants={cardMotion} className="text-center">
                            <div className="text-2xl font-bold text-primary mb-2">{referrals}</div>
                            <div className="text-gray-700 font-medium">Referrals</div>
                        </motion.div>
                        <motion.div variants={cardMotion} className="text-center">
                            <div className="text-2xl font-bold text-primary mb-2">{pointsEarned}</div>
                            <div className="text-gray-700 font-medium">Points Earned</div>
                        </motion.div>
                    </div>

                    <motion.div variants={cardMotion} className="mb-6">
                        <label className="block text-gray-700 font-medium mb-3">
                            Your personal referral link:
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                className="w-full px-4 py-4 pr-14 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-mono text-sm focus:outline-none focus:border-purple-400"
                            />
                            <motion.button
                                {...buttonMotion}
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-50 rounded-lg transition-colors group"
                                title="Copy to clipboard"
                            >
                                {copied ? (
                                    <Check size={16} className='text-green-700' />
                                ) : (
                                    <Copy size={16} className='text-primary' />
                                )}
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="flex justify-center gap-4">
                        {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
                            <motion.button
                                key={platform}
                                {...buttonMotion}
                                onClick={() => shareOnSocial(platform)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${platform === 'facebook'
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : platform === 'twitter'
                                        ? 'bg-black hover:bg-gray-800'
                                        : platform === 'linkedin'
                                            ? 'bg-blue-700 hover:bg-blue-800'
                                            : 'bg-green-500 hover:bg-green-600'
                                    }`}
                                title={`Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                            >
                                {platform === 'facebook' && (
                                    <FaceBook />
                                )}
                                {platform === 'twitter' && (
                                    <Twitter />
                                )}
                                {platform === 'linkedin' && (
                                    <Linkedin />
                                )}
                                {platform === 'whatsapp' && (
                                    <Whatsapp />
                                )}
                            </motion.button>
                        ))}
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
}
