import { FetcherOptions } from '../../types/auth'

// 1. 基本 fetcher
export const simpleFetcher = (url: string) => fetch(url).then(res => res.json());

// 2. 進階 fetcher（當需要更多選項時使用）


export const fetcher = async ({ url, options = {} }: { 
    url: string; 
    options?: FetcherOptions 
}) => {
    const {
        method = 'GET',
        payload,
        headers = {},
        token,
    } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'omit',
    };

    //僅在token存在且不為null時添加token
    if (token && token !== 'null') {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }

    if (payload) {
        if (method === 'GET') {
            const params = new URLSearchParams(payload).toString();
            url = `${url}${url.includes('?') ? '&' : '?'}${params}`;
        } else {
            config.body = JSON.stringify(payload);
        }
    }
    
    const response = await fetch(url, config);
    if (!response.ok) {
        // 先嘗試解析錯誤回應的 JSON
        const errorData = await response.json().catch(() => null);
        
        throw new Error(
            JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                errorData
            })
        );
    }
    return response.json();
};
