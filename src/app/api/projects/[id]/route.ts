import Project from '@/app/models/Project';
import connectMongoDB from '@/app/lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { message: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectMongoDB();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { mesaage: 'Project not found' },
        { status: 404 }
      );
    }

    const updatedData = await request.json();
    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return NextResponse.json(
      { message: 'Project updated successfully', project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error updating project:', error);
    return NextResponse.json(
      { message: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // query parameter
    // const id = request.nextUrl.searchParams.get('id');

    const { id } = await params;
    await connectMongoDB();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
