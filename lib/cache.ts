import { MongoClient } from 'mongodb'

export const cache = {
  async get(key: string): Promise<string | null> {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db('saudimoving')
    
    const result = await db.collection('cache').findOne({ key })
    await client.close()

    if (!result) return null
    
    // التحقق من صلاحية الكاش
    if (result.expiresAt < new Date()) {
      await this.del(key)
      return null
    }

    return result.value
  },

  async set(key: string, value: string, ttl: number): Promise<void> {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db('saudimoving')
    
    await db.collection('cache').updateOne(
      { key },
      {
        $set: {
          value,
          expiresAt: new Date(Date.now() + ttl * 1000)
        }
      },
      { upsert: true }
    )
    
    await client.close()
  },

  async del(key: string): Promise<void> {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db('saudimoving')
    
    await db.collection('cache').deleteOne({ key })
    await client.close()
  }
} 