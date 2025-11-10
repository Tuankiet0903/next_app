export const validatePaginationParams = (
  page: string | null,
  limit: string | null
): { page: number; limit: number } => {
  const pageNum = Math.max(1, parseInt(page || "1", 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit || "10", 10))); // Max 100 items per page

  return { page: pageNum, limit: limitNum };
};
