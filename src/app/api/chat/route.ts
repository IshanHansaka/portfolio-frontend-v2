import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { model } from '../../../../lib/geminiModel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Read context from file
    const contextPath = path.join(process.cwd(), 'data', 'context.txt');
    if (!fs.existsSync(contextPath)) {
      console.error('Context file not found at:', contextPath);
      return NextResponse.json(
        { error: 'Context file not found.' },
        { status: 404 }
      );
    }
    const context = await fsPromises.readFile(contextPath, 'utf-8');

    const prompt = `You are a knowledgeable and helpful AI chatbot designed to answer questions about Ishan Hansaka, an undergraduate from the University of Moratuwa, Faculty of IT. You specialize in providing clear, accurate, and informative answers based on the following details: ${context}. With this information, answer the following question in a friendly, accurate manner and concise summary rather than a detailed introduction: "${message}".`;

    const result = await model.generateContent(prompt);

    return NextResponse.json(
      { message: result.response.text() },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Error processing request.' },
      { status: 500 }
    );
  }
}
