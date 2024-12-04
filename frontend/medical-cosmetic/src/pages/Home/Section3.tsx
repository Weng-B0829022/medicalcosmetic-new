import { SmileIcon, BookIcon, BellIcon, HeadphoneIcon } from "../../assets/SVG";

export const Section3 = () => {
    const CELL_BASE_CLASSES = "p-12 flex flex-col justify-center items-center";
    //const ICON_CLASSES = "text-4xl mb-4 text-white";
    const TITLE_CLASSES = "text-xl font-semibold mb-4 text-white";
    const DESCRIPTION_CLASSES = "text-white/90 leading-relaxed";
    const BORDER_CLASSES = "border-white/30";

    const features = [
        {
            icon: <SmileIcon />,
            title: "雙向評價系統",
            description: "用戶和美容師/美容中心互相評價，確保雙方都能獲得高品質的服務體驗。用戶能依據他人評價挑選合適的美容人員，美容師也可累積好評提高信任度。"
        },
        {
            icon: <BookIcon />,
            title: "衛教與美容知識分享",
            description: "定期推送最新的美容保養趨勢及健康資訊，幫助用戶深入了解自己的需求，並共享美容知識，做出更明智的選擇。"
        },
        {
            icon: <BellIcon />,
            title: "即時通知系統",
            description: "不再錯過任何重要的美容針劑！美顏養成助手中心也提醒應定期、按程預約、延續治療，讓你的美麗維持輕鬆無縫銜接。"
        },
        {
            icon: <HeadphoneIcon />,
            title: "AI 美麗助理",
            description: "透過AI分析個人膚質、生活習慣及美妝趨勢，量身打造專屬保養計劃，提供最適合的產品和服務建議，讓每一步養護都事半功倍。"
        }
    ];

    return (
        <div className="min-h-screen py-20" 
            style={{ background: "linear-gradient(317.8deg, #7A54F6 23.78%, #15BDEC 76.22%)" }}>
            <div className="container mx-auto px-4">
                <h2 className="text-center text-white text-4xl font-bold mb-4">產品特色</h2>
                <h3 className="text-center text-white text-2xl mb-16">
                    AI 助力、自我掌握，從裡到綻放自信光彩
                </h3>
                <div className="grid grid-cols-2 relative max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const hasBorderRight = index % 2 === 0;
                        const hasBorderBottom = index < 2;
                        
                        return (
                            <div key={index} 
                                className={`${CELL_BASE_CLASSES} 
                                            ${hasBorderRight ? `border-r ${BORDER_CLASSES}` : ''} 
                                            ${hasBorderBottom ? `border-b ${BORDER_CLASSES}` : ''}`}>
                                {feature.icon}
                                <h4 className={TITLE_CLASSES}>{feature.title}</h4>
                                <p className={DESCRIPTION_CLASSES}>{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
