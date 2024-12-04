import { Layout } from "../../components/SubNavbar";
import Navbar from "../../components/Navbar/Navbar";
import Content from "./Content";

const Dashboard = ({ isClinic }: { isClinic: boolean }) => {
    return (
        // 最外層使用 h-screen 而不是 min-h-screen
        <div className="h-screen flex flex-col">
            <Navbar />
            {isClinic ? (
                <Layout 
                    title="完美女人診所 診所端" 
                component={<div>Component 將在這裡渲染</div>}
            >
                    <Content />
                </Layout>
            ) : (
                <Layout 
                    title="完美女人診所" 
                    component={<div>Component 將在這裡渲染</div>}
                >
                    <Content />
                </Layout>
            )}
        </div>
    );
};

export default Dashboard;