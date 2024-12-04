import { Navbar } from "../../components/Navbar"
import Layout from "../../components/SubNavbar/Layout"
import Content from "./Content"
import { Footer } from "../../components/Footer"

const Discover = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar /> 
            <Layout title="發現" component={<div>Component 將在這裡渲染</div>} >
                <Content />
            </Layout>
            <Footer />
        </div>
    )
}

export default Discover