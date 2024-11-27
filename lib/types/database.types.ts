export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          age_group: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          age_group?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          age_group?: string | null;
          updated_at?: string;
        };
      };
      user_interests: {
        Row: {
          id: string;
          user_id: string;
          interest: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          interest: string;
          created_at?: string;
        };
      };
    };
  };
}

export type Tables = Database['public']['Tables'];
export type Profiles = Tables['profiles']['Row'];
export type UserInterests = Tables['user_interests']['Row'];