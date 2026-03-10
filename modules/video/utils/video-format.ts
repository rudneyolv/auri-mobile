interface FormatVideoTimeParams {
  totalSeconds: number;
}

interface FormatFileSizeParams {
  bytes: number;
}

export function formatVideoTime({ totalSeconds }: FormatVideoTimeParams) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatFileSize({ bytes }: FormatFileSizeParams) {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1)} MB`;
}
