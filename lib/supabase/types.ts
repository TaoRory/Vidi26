export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string
          team_number: number
          name: string
          slogan: string | null
          color_hex: string | null
          members: Json
          cohort: string
          created_at: string
        }
        Insert: {
          id?: string
          team_number: number
          name: string
          slogan?: string | null
          color_hex?: string | null
          members?: Json
          cohort?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
        Relationships: []
      }
      stations: {
        Row: {
          id: string
          slug: string
          name_vi: string
          name_en: string
          description: string | null
          day: number | null
          order_index: number | null
        }
        Insert: {
          id?: string
          slug: string
          name_vi: string
          name_en: string
          description?: string | null
          day?: number | null
          order_index?: number | null
        }
        Update: Partial<Database['public']['Tables']['stations']['Insert']>
        Relationships: []
      }
      challenges: {
        Row: {
          id: string
          station_id: string | null
          name: string
          description: string | null
          max_score: number
          weight: number
          active: boolean
          starts_at: string | null
          ends_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          station_id?: string | null
          name: string
          description?: string | null
          max_score?: number
          weight?: number
          active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['challenges']['Insert']>
        Relationships: []
      }
      scores: {
        Row: {
          id: string
          team_id: string
          challenge_id: string
          raw_score: number
          notes: string | null
          entered_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          challenge_id: string
          raw_score: number
          notes?: string | null
          entered_by?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['scores']['Insert']>
        Relationships: []
      }
      announcements: {
        Row: {
          id: string
          slug: string
          title: string
          body_md: string
          cover_url: string | null
          pinned: boolean
          published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          body_md: string
          cover_url?: string | null
          pinned?: boolean
          published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['announcements']['Insert']>
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: string
          url: string
          caption: string | null
          day: number | null
          station_id: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          url: string
          caption?: string | null
          day?: number | null
          station_id?: string | null
          uploaded_at?: string
        }
        Update: Partial<Database['public']['Tables']['gallery_items']['Insert']>
        Relationships: []
      }
      admin_profiles: {
        Row: {
          user_id: string
          full_name: string | null
          role: 'super_admin' | 'scorer' | 'editor'
          created_at: string
        }
        Insert: {
          user_id: string
          full_name?: string | null
          role?: 'super_admin' | 'scorer' | 'editor'
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['admin_profiles']['Insert']>
        Relationships: []
      }
    }
    Views: {
      latest_scores: {
        Row: {
          team_id: string
          challenge_id: string
          raw_score: number
          notes: string | null
          entered_by: string | null
          created_at: string
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          id: string
          team_number: number
          name: string
          color_hex: string | null
          total_score: number
          challenges_scored: number
          last_update: string | null
        }
        Relationships: []
      }
    }
    Functions: Record<string, unknown>
    Enums: Record<string, never>
  }
}

export type Team = Database['public']['Tables']['teams']['Row']
export type Station = Database['public']['Tables']['stations']['Row']
export type Challenge = Database['public']['Tables']['challenges']['Row']
export type Score = Database['public']['Tables']['scores']['Row']
export type Announcement = Database['public']['Tables']['announcements']['Row']
export type GalleryItem = Database['public']['Tables']['gallery_items']['Row']
export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']
export type LeaderboardEntry = Database['public']['Views']['leaderboard']['Row']
