import { Layout } from "../../components/SubNavbar";
import Navbar from "../../components/Navbar/Navbar";


const Dashboard = ({ isClinic }: { isClinic: boolean }) => {
    const renderContent = () => {
        return (
            <div className="grid grid-cols-16 gap-6 flex-1 p-10 h-full">
                {/* 第一個子元素佔據 6 列 */}
                <div className="col-span-6 grid grid-rows-2 gap-6 h-full rounded-lg shadow-sm">
                    <div className="bg-white h-full rounded-lg shadow-sm p-4">
                        Content 1
                    </div>
                    <div className="bg-white h-full rounded-lg shadow-sm p-4">
                        Content 2
                    </div>
                </div>
                
                {/* 第二個子元素佔據 3 列 */}
                <div className="col-span-5 bg-white h-full rounded-lg shadow-sm p-4">
                    Content 3
                </div>
                
                {/* 第三個子元素佔據 3 列 */}
                <div className="col-span-5 grid grid-rows-16 gap-6 h-full rounded-lg shadow-sm">
                    <div className="row-span-4 bg-white h-full rounded-lg shadow-sm p-4">
                        Content 4
                    </div>
                    <div className="row-span-12 bg-white h-full rounded-lg shadow-sm p-4">
                        Content 5
                    </div>
                </div>
            </div>
        );
    };

    return (
        // 最外層使用 h-screen 而不是 min-h-screen
        <div className="h-screen flex flex-col">
            <Navbar />
            {isClinic ? (
                <Layout 
                    title="完美女人診所 診所端" 
                component={<div>Component 將在這裡渲染</div>}
            >
                    {renderContent()}
                </Layout>
            ) : (
                <Layout 
                    title="完美女人診所" 
                    component={<div>Component 將在這裡渲染</div>}
                >
                    {renderContent()}
                </Layout>
            )}
        </div>
    );
};

export default Dashboard;