export default function Layout({ 
    title, 
    component, 
    children 
}: { 
    title: string;
    component: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        // 移除 min-h-screen，改用 flex-1
        <div className="flex-1 bg-primary-lighter pt-20 flex flex-col" 
            style={{ 
                backgroundImage: "url('/static/home-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="flex p-6 gap-6 justify-between">
                <div className="w-1/4 flex items-center">
                    <h1 className="text-2xl font-bold  text-white">
                        {title}
                    </h1>
                </div>
                <div className="w-1/4 bg-white p-6">
                    <div className="text-text-60 text-center">
                        {component}
                    </div>
                </div>
            </div>
            {/* 確保這個容器也是 flex-1 */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}