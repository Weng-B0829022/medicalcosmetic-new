// types/auth.ts

// JWT Token 解碼後的完整資料結構
export interface TokenPayload {
    // JWT 標準欄位
    token_type: 'access' | 'refresh';  // token類型
    exp: number;                       // 過期時間
    iat: number;                       // 發行時間
    jti: string;                       // JWT ID
    
    // 使用者資訊
    user_id: number;
    email: string;
    user_type: string;
    first_name: string;
    last_name: string;
}

// API 響應格式
export interface TokenResponse {
    access: string;    // access token字串
    refresh: string;   // refresh token字串
}

// 應用程式中使用的使用者資訊
export interface UserInfo {
    user_id: number;
    email: string;
    user_type: string;
    first_name: string;
    last_name: string;
}

// API 請求選項
export interface FetcherOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    payload?: Record<string, any>;
    headers?: HeadersInit;
    token?: string | null;
}
