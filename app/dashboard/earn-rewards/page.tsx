'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import { EarnPoints } from '@/components/earn-rewards/earn-points'
import { RedeemRewards } from '@/components/earn-rewards/redeem-rewards'

const tabs = ['earn', 'redeem'] as const

export default function App() {
    const [activeTab, setActiveTab] = useState<'earn' | 'redeem'>('earn')

    const [indicator, setIndicator] = useState({
        left: 0,
        width: 0,
    })

    const containerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    useLayoutEffect(() => {
        const index = tabs.indexOf(activeTab)
        const tab = tabRefs.current[index]
        const container = containerRef.current

        if (!tab || !container) return

        const tabRect = tab.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        setIndicator({
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
        })
    }, [activeTab])

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div
                    ref={containerRef}
                    className="relative flex gap-8 mb-8 border-b border-gray-200"
                >
                    <span
                        className="absolute bottom-0 h-1 bg-primary rounded transition-all duration-300 ease-in-out"
                        style={{
                            left: indicator.left,
                            width: indicator.width,
                        }}
                    />
                    <button
                        ref={(el) => { tabRefs.current[0] = el }}
                        onClick={() => setActiveTab('earn')}
                        className={`pb-4 whitespace-nowrap px-4 font-semibold text-lg cursor-pointer transition-colors duration-200 ${activeTab === 'earn'
                                ? 'text-primary bg-[#f4effb]'
                                : 'text-gray-500'
                            }`}
                    >
                        Earn Points
                    </button>
                    <button
                        ref={(el) => { tabRefs.current[1] = el }}
                        onClick={() => setActiveTab('redeem')}
                        className={`pb-4 px-4 whitespace-nowrap cursor-pointer font-semibold text-lg transition-colors duration-200 ${activeTab === 'redeem'
                                ? 'text-primary bg-[#f4effb]'
                                : 'text-gray-500'
                            }`}
                    >
                        Redeem Rewards
                    </button>
                </div>

                {activeTab === 'earn' ? <EarnPoints /> : <RedeemRewards />}
            </div>
        </div>
    )
}
