const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(uuid: string) {
  const inputIsUuid: boolean = regex.test(uuid);
  return inputIsUuid;
}