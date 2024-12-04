export const Section5 = () => {
    return (
        <div className="bg-[#140665] min-h-screen text-white py-16">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">用戶見證</h2>
                    <h3 className="text-4xl font-bold">實證美麗蛻變，效果看得見</h3>
                </div>

                {/* Before/After Comparison */}
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    {/* Before Image */}
                    <div className="flex-1 max-w-md">
                        <div className="mb-4">
                            <img 
                                src="/static/exp1.png" 
                                alt="療程前" 
                                className="w-full rounded-lg"
                            />
                        </div>
                        <p className="text-sm text-gray-300">
                            療程前：不均勻，超級暗沉肌膚狀態，毛孔粗糙，痘痘痕跡，黑眼圈明顯
                        </p>
                    </div>

                    {/* After Image */}
                    <div className="flex-1 max-w-md">
                        <div className="mb-4">
                            <img 
                                src="/static/exp2.png" 
                                alt="療程後" 
                                className="w-full rounded-lg"
                            />
                        </div>
                        <p className="text-sm text-gray-300">
                            療程後：膚色變得均勻，肌膚水嫩有光澤 超級透亮，毛孔變細緻許多，斑點淡化，痘痘淨消失，熬夜痕跡可掩飾
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <button className="btn-shining-star px-16">
                        立即體驗
                    </button>
                </div>
            </div>
        </div>
    );
};