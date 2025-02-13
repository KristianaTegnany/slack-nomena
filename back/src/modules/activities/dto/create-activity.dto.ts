export class CreateActivityDto {
  id?: string;
  userId: string | null;
  workspaceId: string | null;
  channelId: string | null;
  type: string; // TODO: devrait être un enum mais ça va pour l'instant
  desciption: string;
  createdAt: Date;
}
