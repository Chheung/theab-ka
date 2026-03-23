export function useWedding() {
  const config = useRuntimeConfig();
  const slug = config.public.weddingSlug as string;
  const apiBase = config.public.apiBase as string;

  const {
    data: wedding,
    status,
    error,
  } = useAsyncData("wedding", () =>
    $fetch<any>(`${apiBase}/public/weddings/${slug}`).then((res) => res.data),
  );

  const loading = computed(() => status.value === "pending");

  return { wedding, loading, error };
}
