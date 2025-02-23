import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const buffer = await file.arrayBuffer();
    const hash = crypto.createHash('md5').update(Buffer.from(buffer)).digest('hex');
    const ext = file.name.split('.').pop();
    const filename = `${hash}.${ext}`;

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    try {
      await writeFile(join(uploadsDir, filename), Buffer.from(buffer));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        const fs = require('fs/promises');
        await fs.mkdir(uploadsDir, { recursive: true });
        await writeFile(join(uploadsDir, filename), Buffer.from(buffer));
      } else {
        throw error;
      }
    }

    return NextResponse.json({
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
