interface FormatCollabPriceParams {
  collab_price_min: number | null;
  collab_price_max: number | null;
}

export function formatCollabPrice({ collab_price_min, collab_price_max }: FormatCollabPriceParams) {
  if (collab_price_min === null && collab_price_max === null) {
    return 'Faixa de collab não informada';
  }

  if (collab_price_min === 0 && collab_price_max === 0) {
    return 'Aceita collab gratuita';
  }

  if (collab_price_min !== null && collab_price_max !== null) {
    return `Collab: R$ ${collab_price_min} - R$ ${collab_price_max}`;
  }

  if (collab_price_min !== null) {
    return `Collab a partir de R$ ${collab_price_min}`;
  }

  return `Collab até R$ ${collab_price_max}`;
}
