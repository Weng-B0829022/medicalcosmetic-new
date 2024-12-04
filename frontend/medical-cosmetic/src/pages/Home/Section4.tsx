import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "../../components/ui/carousel";

export const Section4 = () => {
    const treatments = [
        {
            id: 1,
            image: "/static/treatment1.png",
            title: "水光針補水療程",
            description: "深入表皮層與真皮層之間，深層保濕並提升肌膚彈性，讓肌膚立即呈現水嫩光澤感。搭合玻尿酸水嫩滑潤護理，恢復自然保養。",
            link: "了解更多"
        },
        {
            id: 2,
            image: "/static/treatment2.png",
            title: "電波拉皮緊緻療程",
            description: "利用高頻電波刺激膠原蛋白重生，有效提升臉部肌膚。並促進人氣療程，讓你在程訪過程中享有年輕緊緻的肌膚。",
            link: "了解更多"
        },
        {
            id: 3,
            image: "/static/treatment3.png",
            title: "皮秒雷射波斑療程",
            description: "以最溫和的雷射療程集中色素，有效去化斑點、疤痕和色素沉著。針對各種膚色問題給予調理，讓膚色呈現均勻亮白。",
            link: "了解更多"
        },
        {
            id: 4,
            image: "/static/treatment1.png",
            title: "皮秒雷射波斑療程",
            description: "以最溫和的雷射療程集中色素，有效去化斑點、疤痕和色素沉著。針對各種膚色問題給予調理，讓膚色呈現均勻亮白。",
            link: "了解更多"
        }
    ];

    const TreatmentCarousel = ({ treatments }: { treatments: Array<{
        id: number;
        image: string;
        title: string;
        description: string;
        link: string;
    }> }) => {
        return (
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: 1,
                }}
                className="w-full max-w-6xl mx-auto px-4 relative"
            >
                <CarouselContent className="-ml-4">
                    {treatments.map((treatment: typeof treatments[0]) => (
                        <CarouselItem key={treatment.id} className="pl-4 basis-1/3">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
                                <img 
                                    src={treatment.image}
                                    alt={treatment.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-white">
                                        {treatment.title}
                                    </h3>
                                    <p className="text-white/90 mb-4 leading-relaxed">
                                        {treatment.description}
                                    </p>
                                    <a href="#" className="text-blue-300 hover:text-blue-400 flex items-center gap-2">
                                        {treatment.link}
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-12 border-none text-white bg-transparent hover:bg-transparent hover:text-white scale-150 w-12 h-12" />
                <CarouselNext className="absolute -right-12 border-none text-white bg-transparent hover:bg-transparent hover:text-white scale-150 w-12 h-12" />
            </Carousel>
        );
    };

    return (
        <div className="min-h-screen bg-[#140665] py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-white text-4xl font-bold mb-4">療程介紹</h2>
                <h3 className="text-center text-white text-2xl mb-16">
                    精準護理，為你量身打造的美麗升級
                </h3>
                <TreatmentCarousel treatments={treatments} />
                <div className="text-center mt-12">
                    <button className="bg-white/10 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-colors">
                        開始美麗旅程
                    </button>
                </div>
            </div>
        </div>
    );
};