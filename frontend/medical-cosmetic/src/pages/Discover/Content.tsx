interface Treatment {
    id: number;
    image: string;
    clinic: string;
    title: string;
    description: string;
}

const treatments: Treatment[] = [
    {
        id: 1,
        image: "/static/discover1.png",
        clinic: "奧莉美診所",
        title: "電波拉皮緊緻療程",
        description: "利用高頻電波刺激膠原蛋白增生，有效收緊鬆弛肌膚，改善細紋讓不再斑斑，非侵入式療程，讓你在舒適過程中享有極致嫩膚面。"
    },
    {
        id: 2,
        image: "/static/discover2.png",
        clinic: "多美星診所",
        title: "皮秒雷射淡斑療程",
        description: "利用超短脈衝雷射能量，解除髮粒黑色素，改善色斑、痘疤及膚色不均，同時促進膠原蛋白再生，有效縮小毛孔並締造亮泌肌膚的效果。"
    },
    {
        id: 3,
        image: "/static/discover3.png",
        clinic: "美麗人生診所",
        title: "音波拉提緊緻肌膚",
        description: "音波拉提是一種非侵入性療程技術，利用高頻音波刺激膠原蛋白再生，刺激膠原蛋白增生，達到緊緻提拉效果，特別適合改善鬆弛肌及改善粗大毛孔，恢復肌膚彈性與年輕感。"
    },
    {
        id: 4,
        image: "/static/discover4.png",
        clinic: "完美診所",
        title: "天鵝頸打造優雅頸線",
        description: "天鵝頸是現代職業優雅女性的重要象徵及態勢，透過頸部按摩與療程，讓頸部緊實緊緻光滑，並且如天鵝般優雅修長的線條，展現年輕與自信。"
    },
    {
        id: 5,
        image: "/static/discover5.png",
        clinic: "第一診所",
        title: "美白針亮麗肌膚",
        description: "調和注入美白、亮白及抗老等成分，幫助美白化、抑制黑色素生成，將肌膚亮度提升並減去暗沉，讓你展現年輕光采。"
    },
    {
        id: 6,
        image: "/static/discover6.png",
        clinic: "塑醫診所",
        title: "冷凍溶脂",
        description: "冷凍溶脂是一種非侵入性體雕治療，利用低溫冷凍脂肪細胞，促使脂肪晶化並代謝排出，達到局部雕塑瘦身，塑造完美體態曲線。"
    }
];

const Content = () => {
    return (
        <div className=" py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12  text-white">發掘療程</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treatments.map((treatment) => (
                        <div key={treatment.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="relative h-64">
                                <img 
                                    src={treatment.image} 
                                    alt={treatment.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">{treatment.clinic}</p>
                                <h3 className="text-xl font-bold mb-3">{treatment.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{treatment.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition">
                        展開更多
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Content;