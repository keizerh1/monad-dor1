import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL or SUPABASE_SERVICE_KEY is missing")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({
        hasVoted: false,
        votedProjectId: null,
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
    }

    // Vérifie si l'utilisateur a voté
    const { data: existingVote, error } = await supabase
      .from("votes")
      .select("project_id")
      .eq("discord_id", session.user.id)
      .single()

    if (error && error.code !== "PGRST116") {
      console.error("Error checking vote status:", error)
      return NextResponse.json({
        hasVoted: false,
        votedProjectId: null,
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
    }

    return NextResponse.json({
      hasVoted: !!existingVote,
      votedProjectId: existingVote?.project_id || null,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    console.error("Vote status API error:", error)
    return NextResponse.json({
      hasVoted: false,
      votedProjectId: null,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  }
}