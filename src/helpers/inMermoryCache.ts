const memoryCache = {};

export async function checkCache(tenantName: string){
  if (!memoryCache[tenantName]) {
    console.log(`[InMemoryCache]: Not found in cache ${tenantName}`);
    return undefined;
  }
  console.log(`[InMemoryCache]: Returning from cache ${tenantName} - ${memoryCache[tenantName].tenantId}`);
  return memoryCache[tenantName];
}

export async function addItemToCache(
  tenantName: string,
  tenantId: string,
  tenantRegion: string
) {
  console.log(`[InMemoryCache]: Adding ${tenantName} - ${tenantId}`);
  memoryCache[tenantName] = { tenantId, tenantRegion }
  console.log(`[InMemoryCache]: Added ${tenantName} - ${tenantId}`);
  return;
}