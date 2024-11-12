import { useAuthStore } from '../../stores/auth';
import { endpoints, API_BASE_URL } from '../../services/api/endpoints';
import { fetcher } from '../../services/api/fetcher';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
// payload: {
// 	email: 'denni9e32@gmail.com',
// 	password: '12eqweqwerZ$'
// }

function LoginButton({ emailRef, passwordRef, setError, setAuth }: { 
	emailRef: React.RefObject<HTMLInputElement>, 
	passwordRef: React.RefObject<HTMLInputElement>, 
	setError: (error: string) => void, 
	setAuth: (token: string) => void 
	}) { 
		const [isLoading, setIsLoading] = useState(false);
		
		const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => { 
		e.preventDefault();
		
		// 檢查輸入是否為空
		if (!emailRef.current?.value.trim()) {
			setError('請輸入電子信箱');
			return;
		}
	
		if (!passwordRef.current?.value.trim()) {
			setError('請輸入密碼');
			return;
		}
	
		// 驗證 email 格式
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(emailRef.current.value)) {
			setError('請輸入有效的電子信箱格式');
			return;
		}
	
		// 驗證密碼長度
		if (passwordRef.current.value.length < 8) {
			setError('密碼長度不得小於 8 個字元');
			return;
		}
	
		setIsLoading(true);
		setError(''); // 清除先前的錯誤訊息
		
		try { 
			const response = await fetcher({ 
			url: API_BASE_URL + endpoints.login, 
			options: { 
				method: 'POST', 
				headers: { 
				'Content-Type': 'application/json' 
				}, 
				payload: { 
				email: emailRef.current.value, 
				password: passwordRef.current.value 
				} 
			} 
			}); 
		
			if (response.access) { 
			setAuth(response.access); 
			window.location.href = '/dashboard'; 
			}
			return response; 
		} catch (error) { 
			const errorDetails = JSON.parse(error instanceof Error ? error.message : String(error)); 
			setError(errorDetails.errorData.error); 
		} finally {
			setIsLoading(false);
		}
		}; 
	
		return ( 
		<button 
			disabled={isLoading} 
			onClick={handleLogin} 
			type="submit"
			className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
		> 
			<div className="flex items-center justify-center space-x-2">
			{isLoading ? <Loader2 className="animate-spin" /> : <span>登入</span>} 
			</div>
		</button> 
		); 
}

function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState('');
    const { 
        token, 
        user, 
        setAuth, 
        isAuthenticated 
    } = useAuthStore();


    const handleRegister = async () => {
        try {
            await fetcher({
                url: API_BASE_URL + endpoints.register,
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    payload: {
                        email: 'denni9e32@gmail.com',
                        password: '12eqweqwerZ$',
                        confirm_password: '12eqweqwerZ$',
                        first_name: 'Test',
                        last_name: 'User'
                    }
                }
            });
            console.log('註冊成功');
        } catch (error) {
            console.error('註冊失敗:', error instanceof Error ? error.message : String(error));
        }
    };

    const handleTestApi = async () => {
        try {
            if (!isAuthenticated()) {
                console.error('請先登入');
                return;
            }

            const response = await fetcher({
                url: API_BASE_URL + endpoints.testapi,
                options: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    token
                }
            });
            console.log('API測試成功:', response);
        } catch (error) {
            console.error('API測試失敗:', error instanceof Error ? error.message : String(error));
        }
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="grid grid-cols-12 flex-1">
                <div 
                    className="bg-gray-200 col-span-7"
                    style={{
                        backgroundImage: "url('/public/static/login-background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                </div>
				<div className=" rounded p-4 col-span-5 flex justify-center items-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-semibold text-center">
						登入
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-6">
							<div className="space-y-4">
								{/* Email Input */}
								<div className="space-y-2">
								<Label htmlFor="email">電子信箱</Label>
								<Input
									id="email"
									ref={emailRef}
									type="email"
									placeholder="name@company.com"
									className="w-full py-2"
									required
								/>
								</div>

								{/* Password Input */}
								<div className="space-y-2">
								<div className="flex justify-between items-center">
									<Label htmlFor="password">密碼</Label>
								</div>
									<Input
										id="password"
										ref={passwordRef}
										type="password"
										placeholder="••••••••"
										className="w-full py-2"
										required
									/>
								</div>
								<div className="flex">
									<Label className="text-red-500">{error}</Label>
								</div>
								{/* Privacy Policy Checkbox */}
								<div className="flex items-start space-x-2">
									<Checkbox id="privacy" className="mt-1" />
									<Label 
										htmlFor="privacy" 
										className="text-sm text-gray-600 leading-tight"
									>
										我同意此網站的
										<a href="#" 
											className="text-blue-600 hover:text-blue-800 hover:underline mx-1"
										>
											隱私政策
										</a>
										和
										<a href="#" 
											className="text-blue-600 hover:text-blue-800 hover:underline mx-1"
											>
											使用條款
										</a>
									</Label>
								</div>
							</div>

							{/* Submit Button */}
							<LoginButton 
								emailRef={emailRef}
								passwordRef={passwordRef}
								setError={setError}
								setAuth={setAuth}
							/>

							{/* Sign Up Link */}
							<div className="text-center text-sm text-gray-600">
								尚未建立帳戶？
								<a href="#" 
									className="text-blue-600 hover:text-blue-800 hover:underline ml-1"
									>
									立即註冊
								</a>
							</div>
						</form>
					</CardContent>
					</Card>
                </div>
            </div>

            {!isAuthenticated() && user && (
                <div className="bg-gray-100 rounded p-4">
                    <h2 className="font-bold text-xl mb-4">用戶資訊</h2>
                    <div className="space-y-2">
                        <p><span className="font-semibold">名稱:</span> {user.first_name} {user.last_name}</p>
                        {user.exp && (
                            <p>
                                <span className="font-semibold">Token狀態:</span>
                                <span className={`ml-2 ${isAuthenticated() ? 'text-green-500' : 'text-red-500'}`}>
                                    {isAuthenticated() ? '有效' : '已過期'}
                                </span>
                                <span className="ml-2">
                                    (到期時間: {formatTime(user.exp)})
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;