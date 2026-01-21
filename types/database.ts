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
      'ZAT-Policies Documents': {
        Row: {
          id: string
          Name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          Name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          Name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      'Documents Sent': {
        Row: {
          id: string
          document_on_policies: string
          document_sent_title: string
          host_user: string
          host_email: string
          host_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          document_on_policies: string
          document_sent_title: string
          host_user: string
          host_email: string
          host_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          document_on_policies?: string
          document_sent_title?: string
          host_user?: string
          host_email?: string
          host_name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'Documents Sent_document_on_policies_fkey'
            columns: ['document_on_policies']
            referencedRelation: 'ZAT-Policies Documents'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'Documents Sent_host_user_fkey'
            columns: ['host_user']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          Name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          Name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          Name?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type PolicyDocument = Database['public']['Tables']['ZAT-Policies Documents']['Row']
export type DocumentSent = Database['public']['Tables']['Documents Sent']['Row']
export type User = Database['public']['Tables']['users']['Row']

export type InsertDocumentSent = Database['public']['Tables']['Documents Sent']['Insert']
