import { 
    Calendar,
    Star,
    Loader,
    Clock,
    ShoppingBag,
    ChevronRight,
    Building2
} from 'lucide-react';
//記得修改card邊框 使用變數
const Content = () => {
    return (
        <div className="grid grid-cols-16 gap-6 flex-1 p-10 h-full">
            {/* 左側區塊 */}
            <div className="col-span-6 grid grid-rows-16 gap-6 h-full ">
                {/* 即將來臨的預約 */}
                <div className="bg-gradient-to-br bg-white/20 h-full rounded-lg p-6 text-white row-span-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5" />
                        <h2 className="text-lg font-bold">即將來臨的預約</h2>
                    </div>
                    <div>
                        <p className="text-sm text-gray-200">2025-01-04 週一｜18:30</p>
                        <h3 className="text-xl font-bold my-2">水光針補水療程 (3/5)</h3>
                        <p className="text-sm">完美女人診所 陳約翰醫師</p>
                    </div>
                </div>

                {/* 專屬推薦 */}
                <div className="bg-gradient-to-br bg-white/20  h-full rounded-lg p-6 text-white row-span-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5" />
                        <h2 className="text-lg font-bold">專屬推薦</h2>
                    </div>
                    <div className="relative h-48 mb-4">
                        <img 
                            src="/static/dashboard1.png" 
                            alt="鳳凰電波拉提緊緻" 
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-2">鳳凰電波拉提緊緻</h3>
                    <p className="text-sm text-gray-200 mb-4">
                        注入波痕調整緊實成分，深層保濕維持肌膚彈潤，調節油脂平衡水嫩光澤感。綿密緊緻結冰及細沉肌膚，恢復自然透亮。
                    </p>
                    <div className="flex justify-end items-center gap-1 text-blue-300 hover:text-blue-200 cursor-pointer">
                        <span className="text-sm">了解更多</span>
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
            
            {/* 進行中的療程 */}
            <div className="col-span-5 bg-gradient-to-br bg-white/20 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Loader className="w-5 h-5" />
                        <h2 className="text-lg font-bold">進行中的療程</h2>
                    </div>
                </div>

                {/* 療程列表 */}
                <div className="space-y-6">
                    <div className="border-b border-white/20 pb-6">
                        <h3 className="font-bold mb-4">體雕雕塑</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>下次療程時間</span>
                                <span>2025-01-04 週一｜18:30</span>
                            </div>
                            <div className="flex justify-between">
                                <span>施作診所</span>
                                <span>完美女人診所</span>
                            </div>
                            <div className="flex justify-between">
                                <span>主治醫師</span>
                                <span>陳約翰</span>
                            </div>
                        </div>
                    </div>

                    <div className="pb-6">
                        <h3 className="font-bold mb-4">冷凍雕脂</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>下次療程時間</span>
                                <span>2024-11-01 週四｜15:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>施作診所</span>
                                <span>精緻診所</span>
                            </div>
                            <div className="flex justify-between">
                                <span>主治醫師</span>
                                <span>王志方</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="w-full py-2 bg-white/20 rounded-lg mt-4 hover:bg-white/20/20 transition">
                    管理療程
                </button>
            </div>
            
            {/* 右側區塊 */}
            <div className="col-span-5 grid grid-rows-16 gap-6 h-full">
                {/* 歷史療程 */}
                <div className="row-span-4 bg-gradient-to-br bg-white/20 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <h2 className="text-lg font-bold">歷史療程</h2>
                        </div>
                        <button className="text-sm transition text-white">全部</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">美白針亮膚肌膚</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                    <Building2 className="w-4 h-4" />
                                    <span>完美女人診所 陳約翰醫師</span>
                                </div>
                            </div>
                            <button className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/20/20 transition">評價</button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">皮秒雷射淡斑</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                    <Building2 className="w-4 h-4" />
                                    <span>美麗診所 王淑芬醫師</span>
                                </div>
                            </div>
                            <button className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/20/20 transition">評價</button>
                        </div>
                    </div>
                </div>

                {/* 已購買療程 */}
                <div className="row-span-12 ">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-white" />
                            <h2 className="text-lg font-bold text-white">已購買療程</h2>
                        </div>
                        <button className="text-sm text-white transition">全部</button>
                    </div>
                    <div className="space-y-4">
                        {['電波拉皮緊緻', '冷凍雕脂', '天鵝頸亮白頸紋'].map((treatment, index) => (
                            <div key={index} className="flex gap-4 items-center p-3 bg-white/20 rounded-lg hover:bg-white/20/20 transition cursor-pointer text-white">
                                <img 
                                    src={`/static/dashboard${index + 2}.png`} 
                                    alt={treatment} 
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{treatment}</h3>
                                    <div className="flex items-center gap-1 text-sm text-gray-300">
                                        <Building2 className="w-4 h-4" />
                                        <span>美麗診所 陳約翰醫師</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;