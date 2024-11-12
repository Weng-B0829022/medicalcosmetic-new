import { useEffect } from 'react';

const useOnMount = (callback: () => void | (() => void)) => {
    useEffect(() => {
        // 執行傳入的回調函數並保存可能的清理函數
        const cleanup = callback();
        
        // 返回清理函數
        return () => {
            if (typeof cleanup === 'function') {
                cleanup();
            }
        };
    }, []);
};