'use server'

import {  Prefactures, Population,} from '@/types/resas';

export async function getPrefactures(): Promise<Prefactures | null> {
    try{
        const url = String(process.env.RESAS_API_URL) + String(process.env.RESAS_PREFECTURES_API);
        const res = await fetch(url, {
            headers: {
            'X-API-KEY': String(process.env.RESAS_API_KEY)
            }
        })
        const json: Prefactures = await res.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
    
}

export async function getPopulation(prefCode: number): Promise<Population | null>{
    try{
        const url = String(process.env.RESAS_API_URL) + String(process.env.RESAS_POPULATION_API) + `?prefCode=${prefCode}`;
        const res = await fetch(url, {
            headers: {
            'X-API-KEY': String(process.env.RESAS_API_KEY)
            }
        })
        const json: Population = await res.json();
        return json;
    }catch (error) {
        console.error(error);
        return null;
    }
}