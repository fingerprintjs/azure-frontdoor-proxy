export enum Region {
  us = 'us',
  eu = 'eu',
  ap = 'ap',
}

function isRegion(region: string): region is Region {
  return Object.values<string>(Region).includes(region)
}

export function getValidRegion(region: string): Region {
  if (isRegion(region)) {
    return region
  }

  return Region.us
}
