export function useTemplateAssets() {
  const { wedding } = useWedding();

  const assets = computed(() => {
    const map: Record<string, string> = {};
    for (const a of wedding.value?.template_assets ?? []) {
      map[a.key] = a.url;
    }
    return map;
  });

  const asset = (key: string) => assets.value[key] || null;

  const hasAsset = (key: string) => !!assets.value[key];

  return { assets, asset, hasAsset };
}
