import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_KEY is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        hasVoted: false, 
        votedProjectId: null 
      })
    }

    // Check if user has voted for any project
    const { data: existingVote, error } = await supabase
      .from('votes')
      .select('project_id')
      .eq('discord_id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking vote status:', error)
      return NextResponse.json({ 
        hasVoted: false, 
        votedProjectId: null 
      })
    }

    return NextResponse.json({
      hasVoted: !!existingVote,
      votedProjectId: existingVote?.project_id || null
    })
  } catch (error) {
    console.error('Vote status API error:', error)
    return NextResponse.json({ 
      hasVoted: false, 
      votedProjectId: null 
    })
  }
}