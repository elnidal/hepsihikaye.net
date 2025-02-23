import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

async function getPosts() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function savePosts(posts: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await request.json();
    const posts = await getPosts();
    const postIndex = posts.findIndex((p: any) => p.id === params.id);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Initialize likes/dislikes if they don't exist
    posts[postIndex].likes = posts[postIndex].likes || 0;
    posts[postIndex].dislikes = posts[postIndex].dislikes || 0;

    if (type === 'like') {
      posts[postIndex].likes++;
    } else if (type === 'dislike') {
      posts[postIndex].dislikes++;
    }

    await savePosts(posts);

    return NextResponse.json({
      likes: posts[postIndex].likes,
      dislikes: posts[postIndex].dislikes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update likes' },
      { status: 500 }
    );
  }
}
