export function useWedding() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase as string;
  const route = useRoute();
  const slug = computed(() => (route.params.slug as string) || "");
  const code = computed(() => (route.params.code as string) || "");

  const {
    data: wedding,
    status,
    error,
  } = useAsyncData("wedding", () => {
    if (!slug.value) return Promise.resolve(null);
    const url = code.value
      ? `${apiBase}/public/weddings/${slug.value}/invite/${code.value}`
      : `${apiBase}/public/weddings/${slug.value}`;
    return $fetch<any>(url).then((res) => res.data);
  });

  const loading = computed(() => status.value === "pending");

  return { wedding, loading, error, slug, code };
}
