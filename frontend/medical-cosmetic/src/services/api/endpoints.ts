// config/endpoints.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    // 測試
    testapi: '/api/testapi',
    
    // 帳戶相關
    register: '/accounts/register',
    login: '/accounts/login',
    logout: '/accounts/logout',  // 登出端點
    
    // Token 相關
    token: {
        refresh: '/accounts/token/refresh',
        verify: '/accounts/token/verify',    // token 驗證
        revoke: '/accounts/token/revoke',    // token 撤銷
    },
    // 權限相關
    auth: {
        checkPermission: '/accounts/check-permission',
    }
};

// 使用示例
export const createApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;