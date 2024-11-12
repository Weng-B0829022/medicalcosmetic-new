import useSWR from 'swr'
import { API_BASE_URL } from '../services/api/endpoints'
import { fetcher } from '../services/api/fetcher'
import { FetcherOptions } from '../types/auth'


export function useAPI(endpoint: string, options?: FetcherOptions) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    return useSWR(
        options ? { url, options } : url,
        fetcher
    );
}