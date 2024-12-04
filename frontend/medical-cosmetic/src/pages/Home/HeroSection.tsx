
export const HeroSection = () => {
    return (
        <div className="bg-gray-100 min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
                style={{ backgroundImage: "url('/static/home-1.jpg')" }}>
            <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    美麗養成助理 AI 美麗助手
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                    「美麗養成助手．精準規劃．閃耀自信。」
                </p>
                <p className="text-lg md:text-xl mb-8">
                    量身打造的美容管理平台，助你輕鬆掌握美麗進程，實現心中的完美自己。
                </p>
                <button className="btn-shining-star">
                    立即體驗
                </button>
            </div>
        </div>
    );
};