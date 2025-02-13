import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

const uri = process.env.MONGODB_URI || ''

export async function POST(request: Request) {
  try {
    const client = await MongoClient.connect(uri)
    const db = client.db('movers-directory')
    
    const data = await request.json()
    await db.collection('contacts').insertOne(data)
    
    await client.close()
    
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 