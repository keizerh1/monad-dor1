import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_KEY is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get all projects the user has voted for
    const { data: votes, error } = await supabase
      .from('votes')
      .select('project_id')
      .eq('discord_id', session.user.id)

    if (error) {
      console.error('Error fetching user votes:', error)
      return NextResponse.json(
        { error: 'Failed to fetch user votes' },
        { status: 500 }
      )
    }

    const votedProjects = votes?.map(vote => vote.project_id) || []

    return NextResponse.json({
      votedProjects
    })

  } catch (error) {
    console.error('User votes API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
