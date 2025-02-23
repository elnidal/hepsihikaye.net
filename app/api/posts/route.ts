import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir);
  }
}

// Get all posts
async function getPosts() {
  try {
    await ensureDataDir();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

// Save posts
async function savePosts(posts: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const posts = await getPosts();
    const data = await request.json();

    const newPost = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      category: data.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    posts.unshift(newPost);
    await savePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
