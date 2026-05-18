export function formatMessageTime(isoDate: string | null): string {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return 'agora';
  if (diffMin < 60) return `${diffMin}m`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    if (diffDays === 1) return 'ontem';
    return `${diffDays}d`;
  }

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}
