import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { City, Keyword } from '@/types/city';

export async function getCities(): Promise<City[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'cities.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
      trim: true
    });

    return records.map((row: string[]) => ({
      name: row[0],
      region: row[1] || '',
      lat: row[2] || '',
      lng: row[3] || ''
    }));
  } catch (error) {
    console.error('Error reading cities file:', error);
    return [];
  }
}

export async function getKeywords(): Promise<Keyword[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'keywords.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
      trim: true
    });

    return records.map((row: string[]) => ({
      text: row[0]
    }));
  } catch (error) {
    console.error('Error reading keywords file:', error);
    return [];
  }
} 