export default function Footer() {
    return (
        <footer className="bg-[#8D5CDC] text-white py-6 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center">
                        <img src="/static/logo.png" alt="Beauty Tech" className="h-8" />
                        <span className="ml-2">Beauty Assistance © 2024. All rights reserved.</span>
                    </div>
                    
                    <nav className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-gray-300">所有療程</a>
                        <a href="#" className="hover:text-gray-300">合作診所</a>
                        <a href="#" className="hover:text-gray-300">用戶見證</a>
                        <a href="#" className="hover:text-gray-300">專業團隊</a>
                        <a href="#" className="hover:text-gray-300">FAQ</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};