import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "../../components/ui/carousel";

export const Section2 = () => {
    type slidesType = {
        id: number;
        avatar: string;
        name: string;
        age: string;
        title: string;
        content: string;
    };
    const slides: slidesType[] = [
        {
            id: 1,
            avatar: "/static/avater-1.png",
            name: "林小姐",
            age: "32歲",
            title: "行政助理",
            content: "「年紀漸長後，我發現皮膚的保養越來越需要細心，但生活繁忙總讓我無暇顧及。自從朋友推薦我使用美麗養成助手，一切變得簡單許多。這個平台會根據我的膚質變化給出保養建議，還會定期提醒我去做臉部療程，真的超貼心！現在，我不僅省下了做功課的時間，皮膚也保持在最佳狀態。美麗養成助手就像我的私人美容顧問，讓我忙碌之餘也能從容優雅。」"
        },
        {
            id: 2,
            avatar: "/static/avater-2.png",
            name: "陳太太",
            age: "43歲",
            title: "行政助理",
            content: "「自從開始使用美麗養成助手後，我生活變得更有條理。以前總是忘記保養的步驟和約好的美容療程，但現在這個平台會貼心提醒我該做什麼。它不僅幫我追蹤皮膚狀況，還依據我的需求推薦適合的產品，讓我不再盲目購物。三個月下來，我的皮膚變得明亮細緻，連同事都誇我氣色越來越好！感謝美麗養成助手，讓我更有自信地面對每一天。」"
        },
        {
            id: 1,
            avatar: "/static/avater-1.png",
            name: "林小姐",
            age: "32歲",
            title: "行政助理",
            content: "「年紀漸長後，我發現皮膚的保養越來越需要細心，但生活繁忙總讓我無暇顧及。自從朋友推薦我使用美麗養成助手，一切變得簡單許多。這個平台會根據我的膚質變化給出保養建議，還會定期提醒我去做臉部療程，真的超貼心！現在，我不僅省下了做功課的時間，皮膚也保持在最佳狀態。美麗養成助手就像我的私人美容顧問，讓我忙碌之餘也能從容優雅。」"
        },
    ];
    const TestimonialCarousel = ({ slides }: { slides: slidesType[] }) => {
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
                    {slides.map((slide) => (
                        <CarouselItem key={slide.id} className="pl-4 basis-1/2">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-white h-full">
                                <div className="flex items-center gap-4 mb-4">
                                    <img 
                                        src={slide.avatar} 
                                        alt={slide.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{slide.name}</h3>
                                        <p className="text-sm text-gray-300">{slide.age} | {slide.title}</p>
                                    </div>
                                </div>
                                <p className="text-lg leading-relaxed">
                                    {slide.content}
                                </p>
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
        <div className="min-h-[65vh] bg-cover bg-center bg-no-repeat relative -mt-[20vh] flex justify-center items-end pb-8" 
            style={{ backgroundImage: "linear-gradient(0deg, #140665 70%, rgba(40, 12, 203, 0) 90%)" }}>
            <TestimonialCarousel slides={slides} />
        </div>
    );
};