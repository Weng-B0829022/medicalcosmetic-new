export const Section6 = () => {
    const doctors = [
        {
            name: "李晨哲 醫師",
            specialty: "皮膚雷射、抗老化治療",
            image: "/static/doctor1.png",
            description: "台灣大學醫學系畢業，擅長中心儀器與臨床經驗豐富，兩萬例以上的雷射治療經驗，相信科學有憑據醫品質優先化療程，並以細膩且貼心的態度深受患者信賴"
        },
        {
            name: "陳怡蓁 醫師",
            specialty: "微整注射、玻尿酸填充",
            image: "/static/doctor2.png",
            description: "中山醫學大學醫學系畢業，擅長醫美的儀器與經驗，累積豐富經驗，恆注對技術，專注於自然改善療程，並以溫柔細心的態度贏得信賴，每位患者在她專業的呵護都感到安心，倍感幸"
        },
        {
            name: "王淑芬 醫師",
            specialty: "體雕塑型、冷凍溶脂",
            image: "/static/doctor3.png",
            description: "台北醫學大學醫學系畢業，致力於打造完美體態及立體輪廓，擅長冷凍溶脂的專業，透過調整曲線，為患者量身定制，為每位患者提供力量，讓我們共同追尋美麗"
        },
        {
            name: "林正豪 醫師",
            specialty: "髮際抗老、電波拉皮",
            image: "/static/doctor4.png",
            description: "國防醫學大學醫學系畢業，特製原創療法配合最先進及各類抗老化技術，提供最優質的療求與建議，透過專業評估提供最佳療程，幫助您從基礎老化邁向科學醫美新力。"
        }
    ];

    return (
        <div className="bg-[#140665] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">專業團隊</h2>
                    <h3 className="text-4xl font-bold mt-2">值得信賴的專業團隊在此為您的美麗</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doctors.map((doctor, index) => (
                        <div key={index} className="bg-white/10 rounded-lg backdrop-blur-sm">
                            <img 
                                src={doctor.image} 
                                alt={doctor.name} 
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <div className="p-4">
                                <h4 className="text-xl font-bold mb-1">{doctor.name}</h4>
                                <p className="text-sm text-gray-300 mb-3">{doctor.specialty}</p>
                                <p className="text-sm text-gray-400">{doctor.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};