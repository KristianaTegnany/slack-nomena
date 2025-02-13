export class CreateActivityDto {
  id?: string;
  userId: string | null;
  workspaceId: string | null;
  channelId: string | null;
  type: string; // TODO: devrait être un enum mais ça va pour l'instant
  desciption: string;
  created_at: Date;
}

// Activity (Activités des utilisateurs)

//     - id (UUID)
//     - user_id (UUID, réf. User) → Qui a fait l’action
//     - workspace_id (UUID, réf. Workspace) → Dans quel workspace
//     - channel_id (UUID, réf. Channel, nullable) → Si l’activité concerne un canal
//     - destination_id (UUID, réf. User, nullable) → Si c’est un message privé
//     - type (Enum: message_sent, channel_created, user_joined, etc.)
//     - description (String) → Un résumé de l’action (ex: "Jean a envoyé un message dans #général")
//     - created_at (DateTime)
