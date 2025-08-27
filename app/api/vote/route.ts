import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_KEY is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
        
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { projectId } = await request.json()

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Check if user has already voted for ANY project (not just this one)
    const { data: existingVote, error: checkError } = await supabase
      .from('votes')
      .select('id, project_id')
      .eq('discord_id', session.user.id)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing vote:', checkError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    if (existingVote) {
      return NextResponse.json(
        { error: 'You have already voted. Each Discord user can only vote once.' },
        { status: 409 }
      )
    }

    // Insert new vote
    const { data: vote, error: insertError } = await supabase
      .from('votes')
      .insert({
        project_id: projectId,
        discord_id: session.user.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting vote:', insertError)
      return NextResponse.json(
        { error: 'Failed to record vote' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      vote
    })
  } catch (error) {
    console.error('Vote API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}